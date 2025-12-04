# Implementation Plan: Luv's Charms E-commerce

## 1. Executive Summary
This document outlines the step-by-step implementation strategy for the "Luv's Charms" e-commerce platform. The project is divided into **5 logical phases**, prioritizing a functional MVP (Minimum Viable Product) that enables the "Checkout to Messenger" workflow. The plan leverages **Next.js 14**, **Sanity.io**, and **Vercel** to ensure low operating costs and high maintainability for the site administrator.

## 2. Technical Setup & Initialization

### 2.1 Prerequisites
*   Node.js 18+ installed.
*   Sanity CLI installed globally: `npm install -g sanity@latest`.
*   Vercel account created.
*   Sanity.io account created.

### 2.2 Initialization Commands
The project will be structured as a monorepo-style or single repo containing both the frontend and Studio, or separate folders. Given the scale, a single repo with Next.js is recommended, using a nested `/studio` route or a separate folder for Sanity if preferred. For simplicity and Vercel integration, we will use the standard Next.js + Sanity embedded setup.

```bash
# 1. Initialize Next.js 14 Project
npx create-next-app@latest luvs-charms --typescript --tailwind --eslint
cd luvs-charms

# 2. Initialize Sanity (inside the project)
npm create sanity@latest
# Select "Clean project with no predefined schemas"
# Output path: ./sanity (or root if using embedded studio)

# 3. Install Core Dependencies
npm install next-sanity @sanity/image-url react-icons clsx tailwind-merge
```

## 3. Implementation Phases

### Phase 1: Project Initialization & CMS Configuration
**Goal:** Establish the data layer and administrator interface.
**Status:** ✅ Complete

| ID | Task | Status | Dependencies | Technical Details | Output/Artifacts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1** | Initialize Repository | ✅ Done | None | Run `create-next-app` and `git init`. Structure folders: `components`, `lib`, `sanity`, `types`. | Git Repo, Basic Next.js App |
| **1.2** | Setup Sanity Project | ✅ Done | 1.1 | Create project in Sanity.io. Configure `sanity.config.ts`. | Sanity Project ID, Dataset |
| **1.3** | Define Category Schema | ✅ Done | 1.2 | Create `sanity/schemas/category.ts`. Fields: `title` (string), `slug` (slug). | `category.ts` |
| **1.4** | Define Product Schema | ✅ Done | 1.3 | Create `sanity/schemas/product.ts`. Fields: `name`, `slug`, `images` (array), `price` (number), `description` (portable text), `category` (ref), `stockStatus` (string options). | `product.ts` |
| **1.5** | Configure Sanity Studio | ✅ Done | 1.4 | Ensure schemas are registered in `sanity/schema.ts`. Verify Studio loads locally. | Functional Local Studio |
| **1.6** | Seed Initial Data | ✅ Done | 1.5 | Manually create 3-5 dummy products and 2 categories via Studio. | Test Data in Sanity |

### Phase 2: Core Frontend Structure
**Goal:** Build the user-facing pages and fetch data from the CMS.
**Status:** ✅ Complete

| ID | Task | Status | Dependencies | Technical Details | Output/Artifacts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2.1** | Setup Sanity Client | ✅ Done | 1.2 | Create `lib/sanity.ts`. Export `client` using `createClient`. Configure `imageUrlBuilder`. | `sanity.ts` |
| **2.2** | Global Layout & Navbar | ✅ Done | 1.1 | Create `app/layout.tsx` and `components/Navbar.tsx`. Include responsive menu and placeholder Cart icon. | Responsive Header |
| **2.3** | Home Page | ✅ Done | 2.1 | `app/page.tsx`. Fetch "Featured" products (limit 4). Create `Hero` component. | Landing Page |
| **2.4** | Shop Page (Catalog) | ✅ Done | 2.1 | `app/shop/page.tsx`. Fetch all products. Implement basic mapping to `ProductCard`. | Grid View of Products |
| **2.5** | Product Card Component | ✅ Done | 2.4 | `components/ProductCard.tsx`. Display image, title, price. Link to detail page. | Reusable Card Component |
| **2.6** | Product Detail Page | ✅ Done | 2.5 | `app/product/[slug]/page.tsx`. Fetch single product by slug. Render gallery, description (PortableText), and price. | Dynamic Product Pages |

### Phase 3: Shopping Cart & State Management
**Goal:** Allow users to collect items and persist them across sessions.
**Status:** ✅ Complete

| ID | Task | Status | Dependencies | Technical Details | Output/Artifacts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **3.0** | Theme Context & Switcher | ✅ Done | 2.2 | Create `context/ThemeContext.tsx`. Support "Default" and "Sage Green" themes. Add switcher to Navbar. | Theme Switcher, Sage Theme |
| **3.1** | Cart Context Setup | ✅ Done | 1.1 | Create `context/CartContext.tsx`. Use `createContext`, `useReducer` or `useState`. Define types: `CartItem` (id, name, price, qty, image). | Global State Provider |
| **3.2** | LocalStorage Persistence | ✅ Done | 3.1 | Implement `useEffect` to load/save cart state to `localStorage`. | Persistent Cart |
| **3.3** | Add to Cart Logic | ✅ Done | 3.1 | In `Product Detail Page`, connect "Add to Cart" button to Context. Handle duplicate items (increment qty). | "Add" Functionality |
| **3.4** | Cart UI (Drawer/Modal) | ✅ Done | 3.3 | Create `components/CartDrawer.tsx`. List items, show total price, delete item button, qty +/- controls. | Functional Cart UI |

### Phase 4: Checkout Logic ("Checkout to Messenger")
**Goal:** Implement the order summary generation and deep linking.
**Status:** ✅ Complete

| ID | Task | Status | Dependencies | Technical Details | Output/Artifacts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **4.1** | Environment Variables | ✅ Done | None | Set `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_MESSENGER_USERNAME` in `.env.local`. | Configured Env |
| **4.2** | Message Formatter | ✅ Done | 3.1 | Create `lib/formatOrder.ts`. Input: `CartItem[]`. Output: Formatted string (as defined in Architecture Plan). | Helper Function |
| **4.3** | Link Generator | ✅ Done | 4.2 | Create `lib/generateLinks.ts`. Returns `https://wa.me/...` and `https://m.me/...`. URL Encode the message. | Helper Function |
| **4.4** | Checkout Component | ✅ Done | 4.3 | Update `CartDrawer`. Add "Checkout" button. Create logic to choose WA vs Messenger. | Checkout UI |
| **4.5** | **Address Gap**: Fallback UI | ✅ Done | 4.4 | Implement a "Copy Order Text" button for users whose deep links fail (e.g., desktop Messenger issues). | Robustness Feature |
| **4.6** | Cleanup Cart | ✅ Done | 4.4 | Optional: Clear cart logic after user clicks "Send Order" (consider UX - maybe ask confirmation). | Cart Clearing Logic |

### Phase 5: Deployment & Handoff
**Goal:** Launch the site and ensure the admin can manage it.
**Status:** ✅ Complete

| ID | Task | Status | Dependencies | Technical Details | Output/Artifacts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **5.1** | Vercel Deployment | ✅ Done | All | Connect GitHub repo to Vercel. Add Environment Variables in Vercel Dashboard. | Live URL |
| **5.2** | Sanity CORS Config | ✅ Done | 5.1 | Add Vercel domain to Sanity project's CORS origins to allow frontend data fetching. Env vars verified in `sanity.config.ts` and `src/sanity/env.ts`. | Allowed Origin |
| **5.3** | Admin User Setup | ✅ Done | 1.2 | Invite "Sister" email to Sanity project with Editor role. | User Invitation |
| **5.4** | Documentation | ✅ Done | All | Write `README.md` with "How to Update Products" guide and Deployment Guide for the client. | User Manual |

### Phase 6: UI/UX Enhancements & Fixes
**Goal:** Improve user experience with theme functionality, contact information, and animations.
**Status:** 🔜 Planned

| ID | Task | Status | Dependencies | Technical Details | Output/Artifacts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **6.1** | Fix Theme Switcher | 🔜 Pending | 3.0 | Debug and fix theme switcher functionality. Ensure clicking the switcher properly toggles to sage green theme. Verify theme persistence across page navigation. | Working Theme Toggle |
| **6.2** | Light/Dark Mode Toggle | 🔜 Pending | 6.1 | Implement light and dark mode options with beautiful, aesthetic icons that match the site's design. Consider using moon/sun icons or similar. Ensure smooth transitions between modes. | Light/Dark Mode System |
| **6.3** | Add Contact Information | 🔜 Pending | 2.2 | Add contact details to the site: Phone: 09264163675, Location: Calbayog City (free delivery within Calbayog). Consider adding to footer or contact section. | Contact Info Display |
| **6.4** | Social Media "Coming Soon" UI | 🔜 Pending | 2.2 | Implement user-friendly messaging for social media links that aren't available yet. Add tooltips or modal showing "Coming Soon" instead of broken/missing links. Keep the UI elements but make them informative rather than functional. | "Coming Soon" Indicators |
| **6.5** | Add Site Animations | 🔜 Pending | 2.3, 2.4, 2.6 | Implement animations throughout the app to enhance user experience. Consider: page transitions, product card hover effects, cart drawer slide-in, add-to-cart button feedback, hero section entrance animations. Use Framer Motion or CSS animations. | Animated UI Elements |
| **6.6** | Add Developer Credit | 🔜 Pending | 2.2 | Add subtle developer attribution in footer or about section. Include link to GitHub profile (https://github.com/MasuRii) with avatar image (https://avatars.githubusercontent.com/u/21298898?v=4). Keep it discreet and professional (e.g., "Developed by MasuRii" with small icon/link). | Developer Attribution |

## 4. Addressing Knowledge Gaps

### 4.1 Deep Link Fallback Strategy
*   **Issue:** `m.me` links can be inconsistent on desktop or if the user doesn't have the Messenger app.
*   **Solution:** The Checkout UI will present three options:
    1.  **"Order via WhatsApp"** (Primary, most reliable).
    2.  **"Order via Messenger"** (Secondary).
    3.  **"Copy Order Text"** (Fallback). The user can copy the text, open their preferred chat app manually, and paste it.

### 4.2 Stock Decrement
*   **Issue:** No automatic inventory management.
*   **Solution:** Clearly label stock status in the Admin (Sanity). Frontend will visually grey out or disable "Add to Cart" for items marked `outOfStock`. We will not implement real-time inventory counting in Phase 1.

### 4.3 Reference ID Generation
*   **Issue:** Need a simple unique ID.
*   **Solution:** Use client-side timestamp + random 4-digit suffix.
    *   Example: `#ORD-231024-8821` (YYMMDD-RAND).
    *   This is sufficient for manual processing volume.