# Lata Tea — Premium Corporate & B2B Tea Platform

A high-performance, visually premium, story-driven B2B e-commerce platform and content management system for Lata Tea. Designed specifically to target distributors, corporate pantries, hotels, and retail supermarkets.

## 🚀 Architecture Overview

The Lata Tea platform is designed as a modern **Headless Architecture**, decoupling the high-performance presentation layer from the data management and backend services.

### 1. Presentation Layer (Frontend)
- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: Tailwind CSS (Strict Brand Palette: Orange `#F89E22`, Dark Neutral `#0F172A`, White).
- **Performance**: Ultra-lean payload designed for <100 KB/s connections. Lazy-loaded CMS payload.
- **Bilingual Core**: Full Native English and Marathi (`mr`) support seamlessly integrated into the UI.

### 2. Built-in Editorial CMS (Content Management System)
An integrated, in-browser Editorial CMS allows administrators to modify content in real-time. 
- **URL Routing**: The CMS can be accessed dynamically by appending `/cms` or `?cms=true` to any domain (e.g., `latatea.com/cms`).
- **State Management**: Draft vs. Published state management (`cmsStore.ts`), simulating a headless CMS workflow.
- **Capabilities**:
  - **Tea Blends Catalogue**: Manage product listings, SKUs, and imagery.
  - **Process Steps**: Manage the 7-step Order-to-Delivery roadmap.
  - **Editorial Story**: Manage the brand narrative.
  - **Contact & Head Office**: Manage primary contact details without exposing sensitive statutory or banking information.

### 3. Domain Management System
The CMS includes a robust **Domain Manager** module.
- Allows administrators to wire new custom domains on the fly (e.g., `brand.latatea.com`).
- Provides DNS configuration instructions for major providers (Hostinger, Cloudflare, GoDaddy).
- Ensures that the `/cms` route dynamically resolves across any newly connected alias or canonical domain.

### 4. Node.js Microservices (Backend Architecture)
While the frontend acts as a standalone SPA, the platform is architected to interface with Node.js microservices for robust B2B operations:
- **Inquiry & CRM Service**: Handles incoming distributor and sample requests from the frontend, routing them to the regional sales teams.
- **Content Delivery API**: A Node/Express service that will persist the `CMSState` JSON to a database (e.g., MongoDB/PostgreSQL) and serve it to the Edge.
- **Media Optimization Service**: Processes and optimizes uploaded imagery into modern formats (WebP/AVIF) via Node pipelines before serving via CDN.

## 🎨 Design System & UI Principles

- **Target Audience**: Business buyers, older demographics, distributors.
- **Visual Rhythm**: Minimal, professional, trustworthy. Large visual compositions with generous whitespace.
- **Color Palette**: 
  - `brand-primary`: `#0F172A` (Deep Slate/Black)
  - `brand-accent`: `#F89E22` (Signature Orange)
  - All legacy green accents have been explicitly removed to align with the premium brand identity.
- **Layout**: "Myntra-style" 4-column product grid to minimize scrolling and maximize catalog visibility.

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

### Accessing the CMS
While running locally, append `?cms=true` or navigate to `/cms` to access the Editorial Dashboard.
**Default Credentials:**
- **User**: `Murjo Basu`
- **Password**: `Basu@123`

### Build for Production
```bash
npm run build
```
Generates a highly optimized, static bundle in the `dist` directory, ready to be deployed to Vercel, Cloudflare Pages, or any Edge network.

## 🔒 Security & Compliance
- **Removed Statutory Data**: All sensitive banking, IFSC, and financial settlement data has been strictly stripped from the public-facing frontend.
- **Compliance Abstraction**: FSSAI and GSTIN information are abstracted into the CMS and optionally displayed, maintaining a clean aesthetic for prospective buyers.
