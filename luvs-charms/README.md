# Luv's Charms Developer & Admin Guide

This document provides detailed technical documentation for the Luv's Charms e-commerce application. It covers development setup, project architecture, and administrative workflows for managing content via Sanity Studio.

## 🚀 Technical Stack

- **Frontend Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **CMS (Backend)**: [Sanity.io](https://www.sanity.io/)
- **State Management**: React Context (CartContext, ThemeContext)
- **Deployment Platform**: Vercel

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: v18.x or higher
- **Package Manager**: npm or yarn

### Installation Steps

1.  **Clone the Repository** (if not already done):
    ```bash
    git clone <repository-url>
    cd luvs-charms
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env.local` file in the `luvs-charms/` directory. You will need the following keys (typically provided by the project owner or Sanity dashboard):
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_URL=http://localhost:3000
    # Optional: For social checkout integration
    NEXT_PUBLIC_WHATSAPP_NUMBER=639XXXXXXXXX
    NEXT_PUBLIC_MESSENGER_USERNAME=your.page.username
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

## 🏗️ Project Architecture

### Directory Structure

```text
luvs-charms/
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── studio/          # Embedded Sanity Studio route
│   │   ├── product/[slug]/  # Dynamic product details page
│   │   ├── shop/            # Product catalog page
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable UI components (Navbar, CartDrawer, etc.)
│   ├── context/             # React Context Providers (Cart, Theme)
│   ├── lib/                 # Utilities (link generation, formatting)
│   ├── sanity/              # Sanity.io configuration
│   │   ├── schemaTypes/     # Content schemas (product.ts, category.ts)
│   │   └── lib/             # Sanity client & image builders
│   └── types/               # TypeScript interfaces
├── public/                  # Static assets (images, icons)
├── sanity.config.ts         # Sanity Studio main configuration
└── next.config.ts           # Next.js configuration
```

### Key Features Implementation

- **Checkout to Messenger**: The "Checkout" process builds a formatted message summary of the cart's contents and redirects the user to WhatsApp or Facebook Messenger to finalize the order with the merchant. Logic is located in `src/lib/generateLinks.ts`.
- **Sanity Integration**: Products and categories are fetched dynamically using the Sanity Client (`src/sanity/lib/client.ts`). Images are optimized using `next/image` and Sanity's image builder.

## 👑 Admin Guide (Sanity Studio)

The content management system is embedded directly into the application.

### Accessing the Studio

1.  Navigate to `http://localhost:3000/studio` (local) or `https://your-domain.com/studio` (production).
2.  Log in using your provided credentials.

### Managing Content

-   **Products**:
    -   **Add New**: Click "Create" → "Product". Fill in the name, price, description, and upload images.
    -   **Stock Management**: Use the "Stock Status" dropdown to mark items as `In Stock`, `Out of Stock`, or `Pre-order`.
    -   **Categories**: Assign products to categories for better organization on the Shop page.
-   **Categories**: Create new product categories (e.g., "Charms", "Bracelets") to filter items on the frontend.

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1.  Connect your GitHub repository to Vercel.
2.  Add the Environment Variables defined in the "Installation Steps" section to the Vercel project settings.
3.  Deploy! Vercel will automatically build the Next.js app and handle serverless functions.

**Note**: Ensure you add your production domain to the **CORS Origins** list in your Sanity project dashboard (`manage.sanity.io`) to allow the live site to fetch data.