# Research Findings: Next.js E-commerce Stack for "Luv's Charms"

## Executive Summary
For a cost-effective, modern e-commerce site for "Luv's Charms" (Philippines), we recommend using **Next.js** deployed on **Vercel** (Free Tier). The best content management strategy for a non-technical user is **Sanity.io** due to its generous free tier and customizable "Studio" that allows easy product management. For payments, we recommend a hybrid approach: a **"Checkout to WhatsApp/Messenger"** button for immediate low-tech launch, and **PayMongo** as a future upgrade for automated GCash processing.

---

## 1. Recommended Next.js E-commerce Templates
We evaluated templates based on: **Next.js 14+ (App Router preferred)**, **Tailwind CSS**, **Cart functionality**, and **Maintenance status**.

### Top Picks
| Template | Repository / Link | Key Features | Pros for "Sister" | Cons |
| :--- | :--- | :--- | :--- | :--- |
| **Medusa Next.js Starter** | [medusajs/nextjs-starter-medusa](https://github.com/medusajs/nextjs-starter-medusa) | Full headless commerce engine, highly professional design. | "Real" store feel, scales infinitely. | Requires running Medusa backend (more complex setup than pure CMS). |
| **GoCart** | [GreatStackDev/gocart](https://github.com/GreatStackDev/gocart) | Multi-vendor capabable, Tailwind, simple structure. | Simple codebase to hack on. | Might be *too* simple, less "premium" out of the box. |
| **NextMerce** | [NextMerce/nextjs-ecommerce-template](https://github.com/NextMerce/nextjs-ecommerce-template) | Integration with Sanity (in some versions), clean UI. | Designed for dropshipping/simple retail. | "Pro" version upsell exists. |
| **Next.js Commerce** | [vercel/commerce](https://github.com/vercel/commerce) | The "Gold Standard" by Vercel. Integrates with BigCommerce/Shopify/etc. | Best performance, best code quality. | Overkill; usually requires a paid platform backend (Shopify/BigCommerce) unless swapped for a custom provider. |
| **CozyCommerce** | *Website Template* | Full-stack, includes dashboard. | "All-in-one" promise. | Less community support than major open source repos. |

**Recommendation:** Start with **Medusa** if you want a full "Shopify-like" backend for free (self-hosted), OR use a custom **Next.js + Sanity** starter (like [sanity-io/ecommerce-template](https://github.com/sanity-io/ecommerce-template)) to give the sister the easiest editing experience.

---

## 2. Headless CMS Options (Free Tier Evaluation)
For a non-technical user to manage products (Image, Price PHP, Description) without code.

| CMS | Free Tier Limits | Ease of Use (Client) | Developer Experience | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **Sanity.io** | **Generous:** 20 users, unlimited datasets, generous bandwidth. | **Excellent:** "Sanity Studio" is a customizable desk. Real-time previews. | High. GROQ query language is powerful. | **WINNER.** Best free tier and editor experience. |
| **Contentful** | **Good:** 5 users, 25k records. | Good, but strictly form-based. Less "visual" by default. | Standard REST/GraphQL. Very strict modeling. | Solid runner-up, but limits are tighter. |
| **Prismic** | **Okay:** 1 user (Community). | "Slices" are great for landing pages, tricky for strict product catalogs. | Easy setup, but restricted user count on free tier. | Good for marketing sites, less for product catalogs. |
| **Strapi** | **Self-Hosted:** Free (unlimited). **Cloud:** Paid/Trial. | Familiar "WordPress-like" admin panel. | Requires hosting the API yourself (e.g., on Render/Railway). | Too much maintenance (database + API hosting) for this project. |

**Why Sanity?**
*   **The Studio:** You can customize the dashboard to look exactly like a simple form for "Add Bracelet".
*   **Free Tier:** You won't hit the limits with a small shop.
*   **Image Pipeline:** Auto-optimizes uploaded images (crucial for mobile PH users).

---

## 3. Payment & Checkout for Philippines (GCash/COD)
Most international gateways (Stripe) are hard to activate in PH without business registration.

### Option A: Manual "Checkout to Chat" (Recommended for Day 1)
*   **Flow:** User adds items -> Clicks "Order via WhatsApp/Messenger" -> System generates pre-filled message: *"Hi Luvs Charms, I want to buy [Item List]. Total: ₱1,500."* -> Sends to Sister.
*   **Payment:** Sister replies with her personal **GCash QR Code**.
*   **Pros:** Zero tech setup, zero fees, personal touch (Filipino market loves this).
*   **Cons:** Manual tracking.

### Option B: PayMongo (Automated)
*   **Service:** [PayMongo](https://paymongo.com/) (Leading PH payment aggregator).
*   **Methods:** GCash, GrabPay, Maya, Cards.
*   **Cost:** No monthly fee. ~2-3% per transaction.
*   **Integration:** well-documented API.
*   **Pros:** Professional feel, automatic status updates.
*   **Cons:** Requires account verification (ID), strictly regulated.

**Recommendation:** Build the site with **Option A (Chat Checkout)** first. It's "free" and immediate. Upgrade to PayMongo later.

---

## 4. Hosting Strategy
Comparison for Next.js (App Router) hosting.

| Provider | Free Tier Specs | Next.js Support | Pros/Cons |
| :--- | :--- | :--- | :--- |
| **Vercel** | **Hobby:** 100GB Bandwidth, Serverless Functions included. | **Native:** Zero-config. Features (ISR, Image Opt) work out of the box. | **Best Choice.** Soft limits. Easy Git integration. |
| **Netlify** | **Starter:** 100GB Bandwidth, 300 build minutes. | Good, but Next.js features sometimes lag behind Vercel's updates. | Solid alternative if Vercel fails. |
| **Render** | **Individual:** Static is free. Services spin down. | Manual config for Next.js SSR. | Good for backends (Docker), less for Next.js frontend. |

**Verdict:** **Vercel**. It is the creator of Next.js and provides the smoothest "git push to deploy" experience for free.

---

## Final Architecture Plan
1.  **Frontend:** Next.js 14 (App Router) + Tailwind CSS.
2.  **Product DB / CMS:** Sanity.io (Free Tier).
3.  **Hosting:** Vercel (Free Tier).
4.  **Checkout:** "Send Order to Messenger" button (initial) -> Manual GCash payment.
