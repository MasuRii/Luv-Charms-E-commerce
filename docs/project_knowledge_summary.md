# Project Knowledge Summary: Luv's Charms E-commerce

## 1. Executive Summary
"Luv's Charms" is a cost-effective, maintainable e-commerce platform designed for the Philippine market. The project utilizes a **Jamstack architecture** with **Next.js 14** for the frontend and **Sanity.io** as a headless CMS, hosted on **Vercel**. A key architectural decision is the **"Checkout to Messenger"** flow, which bypasses complex payment gateway integrations in favor of deep-linking to WhatsApp/Facebook Messenger for manual order processing and payment (GCash/COD). This approach prioritizes low initial cost and ease of use for the non-technical site administrator ("Sister").

## 2. Core Requirements

### 2.1 Functional Requirements
*   **Product Catalog**:
    *   **Home Page**: Hero banner, featured products, and new arrivals.
    *   **Shop Page**: Full catalog view with category filtering.
    *   **Product Details**: High-resolution images, rich text descriptions, pricing, and stock status indicators.
*   **Shopping Cart**:
    *   Add to cart functionality with quantity adjustments.
    *   Persistent cart state (localStorage).
    *   Cart drawer or dedicated page.
*   **Checkout Logic ("Checkout to Messenger")**:
    *   No traditional payment gateway integration in Phase 1.
    *   **Message Generation**: System constructs a structured text summary of the cart (Items, Quantities, Total, Reference ID).
    *   **Redirection**: "Send Order" button deep-links to WhatsApp (`wa.me`) or Messenger (`m.me`) with the pre-filled message.
*   **Content Management (Admin)**:
    *   **Sanity Studio**: A user-friendly dashboard for the "Sister" to manage inventory.
    *   **Capabilities**: Create/Edit/Delete products, upload images (with hotspot cropping), manage categories, and update stock status (`inStock`, `outOfStock`, `preOrder`).

### 2.2 Non-Functional Requirements
*   **Cost-Efficiency**: Must leverage free tiers of Vercel and Sanity to minimize operating costs.
*   **Performance**: High-speed page loads using Next.js App Router and React Server Components.
*   **Usability (Admin)**: The CMS must be accessible to a non-technical user (mobile-friendly image uploads).
*   **Market Adaptation**: Optimized for PH market constraints (mobile-first, low bandwidth optimization via Sanity image pipeline, reliance on social commerce/chat).

## 3. Technology Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16 (App Router)** | Latest features, performance, React Server Components. |
| **Language** | **TypeScript** | Type safety for data models (Product/Category). |
| **Styling** | **Tailwind CSS v4** | Rapid development, responsive design. |
| **Content Backend (CMS)** | **Sanity.io** | Generous free tier, customizable "Studio", image optimization. |
| **Hosting / CDN** | **Vercel** | Zero-config deployment, native Next.js support. |
| **Payment / Checkout** | **Deep Link (WA/Messenger)** | Avoids regulatory/tech hurdles of gateways; fits local "chat-to-buy" behavior. |

### 3.1 Implemented File Structure
The project follows a standard Next.js App Router structure with Sanity integrated:

```text
luvs-charms/
├── src/
│   ├── app/
│   │   ├── studio/[[...tool]]/  # Sanity Studio embedded route
│   │   ├── globals.css          # Tailwind directives
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/              # UI Components
│   ├── lib/                     # Utility functions
│   ├── sanity/                  # Sanity configuration
│   │   ├── lib/                 # Sanity client & image utils
│   │   └── schemaTypes/         # Content schemas (product.ts, category.ts)
│   └── types/                   # TypeScript definitions
├── sanity.config.ts             # Sanity Studio configuration
├── next.config.ts               # Next.js configuration
└── package.json                 # Dependencies (Next 16, React 19, Tailwind 4)
```

## 4. Data Model

The data structure is defined in Sanity.io.

### 4.1 Product Entity
*   `name` (String): Display name.
*   `slug` (Slug): Auto-generated URL identifier.
*   `images` (Array of Images): Gallery with hotspot capabilities.
*   `price` (Number): Cost in PHP.
*   `description` (Portable Text): Rich text content.
*   `categories` (Array of References): Links to `Category` documents.
*   `stockStatus` (String Select): `inStock` | `outOfStock` | `preOrder`.

### 4.2 Category Entity
*   `title` (String): Category name (e.g., "Charms", "Bracelets").
*   `slug` (Slug): URL identifier.

## 5. Key Workflows

### 5.1 Checkout Flow (Shopper)
1.  **Browse**: User adds items to the cart (e.g., "2x Sun Charm").
2.  **Review**: User opens Cart, sees Total (e.g., "₱300").
3.  **Initiate**: User clicks "Checkout".
4.  **Format**: System generates text:
    ```text
    Hello Luv's Charms! I'd like to order:
    - 2x Sun Charm (₱300)
    Total: ₱300
    Reference: #ORDER-12345
    ```
5.  **Redirect**: System opens WhatsApp/Messenger with this text pre-filled.
6.  **Send**: User hits "Send" in the chat app.

### 5.2 Order Fulfillment (Sister)
1.  **Receive**: Sister receives the message on her phone.
2.  **Confirm**: Sister replies with payment details (GCash QR code).
3.  **Verify**: User sends payment screenshot; Sister verifies.
4.  **Complete**: Sister fulfills the order manually.

## 6. Gaps & Ambiguities
Based on the current documentation analysis:
1.  **Message Formatting Details**: The specific format for the order timestamp/ID is mentioned (`#ORDER-TIMESTAMP`) but the generation logic (client-side vs. server-side uniqueness) is not strictly defined. Client-side timestamp is likely sufficient for this scale.
2.  **Inventory Decrement**: There is no automated stock decrementing. Inventory management relies entirely on the Admin manually changing the `stockStatus` to `outOfStock` in Sanity.
3.  **Messenger Fallback**: The documentation notes that `m.me` link text support varies. A specific fallback UI (e.g., "Copy to Clipboard" button) should be prioritized in the implementation plan to handle cases where deep linking fails.
4.  **Contact Information**: The specific phone number (WhatsApp) and Username (Messenger) to be used for the redirection need to be configured as environment variables.

## 7. Implementation Progress

### 7.1 Phase 2: Core Frontend Structure (Completed)
**Completion Date:** December 2025
The core user-facing pages have been successfully implemented, connecting the Next.js frontend to the Sanity CMS.

**Key Technical Decisions:**
*   **Sanity Client:** Configured using `createClient` in `src/sanity/lib/client.ts` to fetch data from the Content Lake.
*   **Dynamic Routing:** Used Next.js App Router dynamic segments (`src/app/product/[slug]/page.tsx`) to generate individual product pages based on the `slug` field from Sanity.
*   **Layout Strategy:** Employed CSS Grid via Tailwind CSS for the responsive product grid on the Shop page.
*   **Image Handling:** Integrated `@sanity/image-url` to optimize image delivery and support hotspot cropping defined in the Studio.

**New Core Components:**
*   **`Navbar`**: Responsive navigation bar with mobile menu support.
*   **`Hero`**: Landing page banner component.
*   **`ProductCard`**: Reusable component for displaying product previews in grids.