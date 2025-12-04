# Luv's Charms E-commerce 🎀

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

Welcome to the official repository for **Luv's Charms**, a specialized e-commerce platform tailored for the Philippine market. This project bridges the gap between automated online shopping and personalized customer service by integrating a unique **"Checkout to Messenger"** workflow.

![Homepage Screenshot](./luvs-charms/public/Screenshot/HomepageLuv's%20Charms%20-%20Handmade%20Jewelry%20&%20Accessories.png)

---

## 📖 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
- [🔌 Integration Details](#-integration-details)
- [📝 License](#-license)
- [👥 Authors](#-authors)

---

## 🎯 Project Overview

**Luv's Charms** is designed to simplify inventory management for business owners while providing a seamless shopping experience for customers. Unlike traditional e-commerce platforms that enforce strict payment gateways, this application respects local buying habits by allowing customers to build a cart and finalize their transaction via personal communication channels like **WhatsApp** or **Facebook Messenger**.

### Why this approach?
- **Personalized Service**: Direct communication allows for custom requests and better customer service.
- **Local Adaptation**: Optimized for markets where "PM is key" (Private Message) is a common purchasing behavior.
- **Real-time Inventory**: Managed via an embedded Sanity Studio CMS.

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Dynamic Product Catalog**: Browse products organized by categories (e.g., Charms, Bracelets).
- **Smart Cart System**: Persistent cart functionality with real-time total calculation.
- **Theming Engine**: 
  - 🌓 **Dark/Light Mode** support.
  - 🎨 **Color Themes**: Toggle between different accent colors for a personalized look.
- **Responsive Design**: Fully optimized for mobile devices, tablets, and desktops.

### 💼 Business Operations
- **"Checkout to Messenger"**: Automatically generates a pre-formatted message with the order summary and redirects the user to the merchant's WhatsApp or Messenger.
- **Embedded Admin Dashboard**: Built-in **Sanity Studio** at `/studio` for managing:
  - Products (Images, Pricing, Stock Status).
  - Categories.
  - Site Settings (e.g., Featured Products limits).
- **Stock Management**: Mark items as `In Stock`, `Out of Stock`, or `Pre-order`.

---

## 🛠️ Tech Stack

This project utilizes the latest web technologies for performance and scalability.

| Category | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.0.7` | App Router, Server Components |
| **UI Library** | [React](https://react.dev/) | `19.2.0` | Component-based UI architecture |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.0` | Utility-first CSS framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `v5` | Static typing for reliability |
| **CMS** | [Sanity.io](https://www.sanity.io/) | `v3` | Headless CMS for content |
| **State** | React Context | - | Cart and Theme management |

---

## 📂 Repository Structure

The project is structured as a standalone Next.js application within the `luvs-charms/` directory.

```text
c:/Repository/Luv-Charms-E-commerce/
├── README.md                  # This file
├── LICENSE                    # MIT License
└── luvs-charms/               # 🚀 MAIN APPLICATION SOURCE
    ├── src/
    │   ├── app/               # Next.js App Router
    │   ├── components/        # Reusable UI Components
    │   ├── context/           # Global State (Cart, Theme)
    │   ├── lib/               # Utilities (Link generation, formatting)
    │   └── sanity/            # CMS Configuration & Schemas
    ├── public/                # Static Assets
    └── sanity.config.ts       # Sanity Studio Config
```

---

## 🚀 Getting Started

To set up the project locally, follow these steps. For detailed documentation, please refer to the **[Application README](./luvs-charms/README.md)**.

### Prerequisites
- Node.js v18+
- npm or yarn

### Quick Setup

1.  **Navigate to the application directory**:
    ```bash
    cd luvs-charms
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file with your Sanity credentials and contact info:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_WHATSAPP_NUMBER=639XXXXXXXXX
    NEXT_PUBLIC_MESSENGER_USERNAME=your.username
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

---

## 🔌 Integration Details

### Messenger & WhatsApp Logic
The core "Checkout" logic is handled in `src/lib/generateLinks.ts`. It takes the cart state, formats it into a readable text summary, and encodes it into a deep link:

- **WhatsApp**: `https://wa.me/[number]?text=[encoded_order]`
- **Messenger**: Opens a direct chat with the page (User pastes the copied order summary).

### Sanity CMS Schema
The content model is defined in `src/sanity/schemaTypes/`:
- **Product**: Contains `slug`, `price`, `stockStatus`, and badges like `isPopular` or `isFeatured`.
- **Category**: Used for filtering products on the Shop page.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 👥 Authors

- **MasuRii** - *Initial Work & Development* - [GitHub Profile](https://github.com/MasuRii)

---
*Built with ❤️ for Luv's Charms*