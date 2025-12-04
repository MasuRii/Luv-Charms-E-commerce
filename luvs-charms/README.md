# Luv's Charms E-commerce

A modern, cost-effective e-commerce platform built for the Philippines market, featuring a "Checkout to Messenger" workflow. This project leverages the power of Next.js 16 and Sanity.io to provide a fast, maintainable, and user-friendly experience for both shoppers and administrators.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-v16.0.7-black)
![React](https://img.shields.io/badge/react-v19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-v4-38bdf8)

## 🚀 Features (Phase 2)

*   **Home Page**: Featured products and hero section.
*   **Shop Page**: Full product catalog with grid layout.
*   **Product Details**: Dynamic pages for individual items (`/product/[slug]`).
*   **Admin Dashboard**: Integrated Sanity Studio at `/studio`.

## 🚀 Tech Stack

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **CMS:** [Sanity.io](https://www.sanity.io/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Deployment:** [Vercel](https://vercel.com/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js 18.x or higher
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd luvs-charms
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory (`luvs-charms/`) and ensure the following Sanity variables are set (these are usually auto-generated during setup):
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Sanity CMS (Admin Studio)

This project includes an embedded Sanity Studio for managing content (Products, Categories, etc.).

1.  Ensure the development server is running (`npm run dev`).
2.  Navigate to **[http://localhost:3000/studio](http://localhost:3000/studio)**.
3.  Log in with your Sanity.io credentials (or the admin provider configured).

From here, you can:
*   Add, edit, or remove **Products**.
*   Manage **Categories**.
*   Update stock status (`In Stock`, `Out of Stock`, `Pre-order`).

## 🚀 Deployment Guide

This project is designed to be deployed on [Vercel](https://vercel.com/), which provides seamless Next.js hosting and automatic deployments from GitHub.

### Required Environment Variables

Before deploying, ensure the following environment variables are configured in your deployment platform (e.g., Vercel Dashboard):

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Checkout Configuration (for WhatsApp/Messenger ordering)
NEXT_PUBLIC_WHATSAPP_NUMBER=639123456789
NEXT_PUBLIC_MESSENGER_USERNAME=your.messenger.username
```

**Variable Details:**

*   **`NEXT_PUBLIC_SANITY_PROJECT_ID`**: Your Sanity project ID (found in Sanity dashboard at [sanity.io/manage](https://sanity.io/manage)).
*   **`NEXT_PUBLIC_SANITY_DATASET`**: The dataset name (typically `production`).
*   **`NEXT_PUBLIC_WHATSAPP_NUMBER`**: WhatsApp business number in international format without `+` or spaces (e.g., `639123456789` for Philippines).
*   **`NEXT_PUBLIC_MESSENGER_USERNAME`**: Facebook Messenger username (the part after `m.me/`).

### Deploying to Vercel

1.  **Connect Repository:**
    *   Log in to [Vercel](https://vercel.com/).
    *   Click "Add New Project" and import your GitHub repository.

2.  **Configure Environment Variables:**
    *   In the Vercel project settings, go to "Environment Variables".
    *   Add all required variables listed above.

3.  **Deploy:**
    *   Vercel will automatically build and deploy your project.
    *   Your live site will be available at `https://your-project.vercel.app`.

4.  **Configure Sanity CORS:**
    *   Go to [sanity.io/manage](https://sanity.io/manage) → Select your project → API → CORS Origins.
    *   Add your Vercel deployment URL (e.g., `https://your-project.vercel.app`).
    *   This allows your frontend to fetch data from Sanity.

## 📖 How to Update Products (Admin Guide)

This section is for the site administrator (Sister) to manage products, categories, and inventory.

### Accessing the Admin Dashboard

1.  **Navigate to the Studio:**
    *   Visit `https://your-site-url.vercel.app/studio` (or `http://localhost:3000/studio` for local development).

2.  **Log In:**
    *   Use your Sanity.io account credentials.
    *   If you haven't been invited yet, ask the developer to add your email as an Editor in the Sanity project settings.

### Adding a New Product

1.  In the Sanity Studio, click **"Product"** in the left sidebar.
2.  Click **"Create New"** (or the `+` icon).
3.  Fill in the product details:
    *   **Name**: Product title (e.g., "Sage Green Charm Bracelet").
    *   **Slug**: Auto-generated from the name (used in the URL). Click "Generate" if needed.
    *   **Images**: Upload product photos by clicking "Upload" or drag-and-drop.
    *   **Price**: Enter the price in Philippine Pesos (₱).
    *   **Description**: Add product details, care instructions, or customization options.
    *   **Category**: Select or create a category (e.g., "Bracelets", "Necklaces").
    *   **Stock Status**: Choose from:
        *   `In Stock` - Product is available for immediate purchase.
        *   `Out of Stock` - Product is unavailable (greyed out on the site).
        *   `Pre-order` - Product can be ordered but will ship later.
4.  Click **"Publish"** to make the product live on the website.

### Editing an Existing Product

1.  In the Studio, click **"Product"** in the sidebar.
2.  Select the product you want to edit from the list.
3.  Make your changes (update price, images, description, stock status, etc.).
4.  Click **"Publish"** to save and update the live site.

### Managing Categories

1.  Click **"Category"** in the sidebar.
2.  Click **"Create New"** to add a category (e.g., "Earrings", "Rings").
3.  Enter:
    *   **Title**: Category name.
    *   **Slug**: Auto-generated URL-friendly name.
4.  Click **"Publish"**.
5.  You can now assign products to this category when editing them.

### Updating Stock Status

*   When a product sells out, edit the product and change **Stock Status** to `Out of Stock`.
*   When restocked, change it back to `In Stock`.
*   The website will automatically reflect these changes (customers won't be able to add out-of-stock items to their cart).

### Tips

*   **Use High-Quality Images**: Product photos should be clear and well-lit.
*   **Write Detailed Descriptions**: Help customers understand the product (materials, size, care instructions).
*   **Check Regularly**: Review the Studio periodically to update stock and add new products.

## 📂 Project Structure

```text
luvs-charms/
├── src/
│   ├── app/
│   │   ├── studio/[[...tool]]/  # Embedded Sanity Studio
│   │   ├── globals.css          # Global styles & Tailwind
│   │   ├── layout.tsx           # Root application layout
│   │   └── page.tsx             # Home page
│   ├── components/              # Reusable UI components
│   ├── lib/                     # Utility functions & helpers
│   ├── sanity/                  # Sanity configuration & schemas
│   │   ├── lib/                 # Sanity client config
│   │   └── schemaTypes/         # Data models (product.ts, category.ts)
│   └── types/                   # TypeScript type definitions
├── public/                      # Static assets
├── sanity.config.ts             # Sanity Studio configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── package.json                 # Project dependencies & scripts
```

## 📄 License

This project is licensed under the MIT License.