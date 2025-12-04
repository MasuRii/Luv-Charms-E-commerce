# Architecture Plan: Luv's Charms E-commerce

## 1. Executive Summary
This architecture describes a cost-effective, maintainable e-commerce platform for "Luv's Charms". The system leverages **Next.js 14** for a high-performance frontend, **Sanity.io** as a user-friendly Headless CMS for product management, and **Vercel** for zero-config hosting. To minimize initial complexity and avoid regulatory hurdles, the checkout process utilizes a "Checkout to Messenger" pattern, redirecting users to WhatsApp or Facebook Messenger with a pre-filled order summary for manual payment processing via GCash/COD.

## 2. System Architecture

### 2.1 High-Level Overview
The system follows a Jamstack architecture where the frontend is decoupled from the content backend.

*   **Frontend:** Next.js 14 (App Router) using React Server Components.
*   **Styling:** Tailwind CSS for rapid, responsive design.
*   **CMS (Backend):** Sanity.io (Free Tier) hosting product data and assets.
*   **Hosting:** Vercel (Free Tier) for global CDN distribution and serverless functions.
*   **Payment/Checkout:** Deep link integration to Messenger/WhatsApp.

### 2.2 Component Diagram Reference
*See `docs/architecture-diagrams/system-context.mmd` for the Context Diagram.*

## 3. Data Model (Sanity Schema)

The CMS is designed for simplicity, allowing a non-technical user ("Sister") to manage inventory via Sanity Studio.

### 3.1 Product Schema (`product.ts`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Display name of the charm/bracelet. |
| `slug` | Slug | URL-friendly ID (auto-generated from name). |
| `images` | Array[Image] | Product gallery with hotspot cropping. |
| `price` | Number | Cost in PHP. |
| `description` | Portable Text | Rich text description (bold, lists, etc.). |
| `categories` | Reference[] | Links to `category` documents. |
| `stockStatus`| String (Select) | Options: `inStock`, `outOfStock`, `preOrder`. |

### 3.2 Category Schema (`category.ts`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Name of category (e.g., "Bracelets", "Charms"). |
| `slug` | Slug | URL identifier. |

## 4. Frontend Structure

The application will use the Next.js App Router (`app/` directory).

### 4.1 Core Pages
1.  **Home (`/`)**: Hero banner, "Featured Products" grid, "New Arrivals".
2.  **Shop (`/shop`)**: Full product catalog with Category filters.
3.  **Product Detail (`/product/[slug]`)**: Large images, price, description, "Add to Cart" button.
4.  **Cart (Drawer/Page)**: Lists added items, total calculation, quantity adjustment.
5.  **Checkout (Modal)**: Collects optional simple details (Name) and provides the "Send Order" button.

### 4.2 Key Components
*   `Navbar`: Logo, Links, Cart Icon (with badge).
*   `ProductCard`: Thumbnail, Name, Price.
*   `CartProvider`: React Context to manage global cart state (persisted to localStorage).
*   `CheckoutButton`: Generates the WhatsApp/Messenger link.

## 5. Checkout Logic: "Checkout to Messenger"

This feature bridges the gap between digital browsing and manual payment.

### 5.1 Technical Flow
1.  **Cart State**: User adds items `[{id: "A", name: "Sun Charm", price: 150, qty: 2}]`.
2.  **Message Formatting**: On checkout, the system constructs a text string:
    ```text
    Hello Luv's Charms! I'd like to order:
    - 2x Sun Charm (₱300)
    Total: ₱300
    Reference: #ORDER-TIMESTAMP
    ```
3.  **URL Encoding**: The string is URL-encoded.
4.  **Redirection**:
    *   **WhatsApp**: `https://wa.me/<PHONE_NUMBER>?text=<ENCODED_MESSAGE>`
    *   **Messenger**: `https://m.me/<USERNAME>?text=<ENCODED_MESSAGE>` (Note: m.me text support varies; fallback to copying text to clipboard if needed).
5.  **Completion**: The user lands in the chat app with the message pre-filled, ready to send.

## 6. Non-Technical User Experience (The "Sister" Requirement)

*   **Sanity Studio**: Will be deployed to `studio.luvscharms.com` (or `/studio` route).
*   **Workflow**: Sister logs in with Gmail -> Clicks "Desk" -> Clicks "Product" -> Clicks "Create" -> Uploads photo from phone -> Hits "Publish".
*   **Updates**: Site rebuilds automatically (via Vercel Deploy Hooks) or uses Incremental Static Regeneration (ISR) to show changes immediately.