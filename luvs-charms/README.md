# Luv's Charms E-commerce

A modern, cost-effective e-commerce platform built for the Philippines market, featuring a "Checkout to Messenger" workflow. This project leverages the power of Next.js 16 and Sanity.io to provide a fast, maintainable, and user-friendly experience for both shoppers and administrators.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-v16.0.7-black)
![React](https://img.shields.io/badge/react-v19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-v4-38bdf8)

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