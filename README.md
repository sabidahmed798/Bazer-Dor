# 🛒 BazarDor 

### Essential Market Prices at a Glance

**BazarDor** is a modern, responsive web application designed to help people explore and compare essential commodity prices across different markets in Bangladesh. It provides an intuitive interface for tracking price changes, browsing product categories, and accessing detailed market-wise pricing information.

[**🌐 Live Demo**](https://vercel.com/) 
[**💻 GitHub Repository**](https://github.com/)

---

## ✨ Key Features

- **📱 Fully Responsive UI** — Optimized for mobile, tablet, laptop, and desktop screens.
- **📈 Daily Price Tracking** — Explore products with rising and falling prices, including percentage changes and visual indicators.
- **🛍️ Product Listings & Details** — Browse essential commodities and compare minimum, maximum, average, and market-wise prices.
- **🗂️ Category-Based Navigation** — Explore products by category and sort them by price in ascending or descending order.
- **🔐 Authentication with Better Auth** — Register and sign in using email/password and configured Google or GitHub social login.
- **⚡ Skeleton Loading States** — Improve the browsing experience while product data is loading.
- **🔔 Interactive Toast Notifications** — Display helpful success, error, and validation messages.
- **📊 Scrolling Price Ticker** — View commodity prices and price-change indicators in a continuously scrolling strip.
- **🧭 Dynamic Routing** — Navigate between the homepage, categories, and product detail pages.
- **🛡️ Protected Product Details** — Restrict detailed market information to authenticated users.
- **🚫 Custom 404 Page** — Provide a friendly error page with an easy way to return home.
- **🚀 Production Deployment** — Hosted on Vercel with support for direct access to dynamic routes.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Application development and UI rendering |
| Next.js App Router | File-based routing, layouts, and navigation |
| TypeScript / JavaScript | Application logic and type safety |
| Tailwind CSS | Responsive styling and layout |
| DaisyUI | Reusable UI components and styling |
| Better Auth | Authentication and session management |
| MongoDB | Database for authentication and configured application data |
| Google OAuth | Google sign-in |
| GitHub OAuth | GitHub sign-in |
| React Hot Toast | Toast notifications and user feedback |
| Git & GitHub | Version control and source code management |
| Vercel | Deployment and hosting |

---

## 🖥️ Application Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero banner, price trends, and all products |
| `/categories/[categoryId]` | Category-based product browsing and price sorting |
| `/product/[slug]` | Protected product details and market-wise price comparison |
| `/signin` | User login with email/password and social authentication |
| `/signup` | User registration and account creation |
| Custom 404 | Friendly error page for invalid routes |

---

## 🚀 Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm, pnpm, or yarn
- A MongoDB database, if required by your configuration
- OAuth credentials for the social login providers you enable

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd bazardor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the variables required by your application.

```env
BACKEND_URL=YOUR_BACKEND_URL
MONGODB_URL=YOUR_MONGODB_CONNECTION_STRING
BETTER_AUTH_SECRET=YOUR_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

**Important:** Use the exact environment variable names expected by your code. Configure only the providers and services you actually use. Never commit secrets or private credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Responsive Design

BazarDor is designed to deliver a consistent experience across different screen sizes.

- **Mobile:** Compact navigation, readable product cards, and stacked layouts.
- **Tablet:** Adaptive grids and flexible spacing.
- **Desktop:** Wider product grids, spacious layouts, and organized market information.

The interface uses responsive layouts and reusable components to keep the application accessible and easy to navigate.

---

## 🔒 Authentication & Security

BazarDor uses Better Auth to support user authentication.

- Email and password registration and login.
- Google and GitHub sign-in when configured.
- Authentication-aware navigation.
- Protected product detail pages.
- User-friendly authentication and validation feedback.
- Environment variables for sensitive configuration.

Social authentication requires valid provider credentials and correctly configured callback URLs.

---

## 🌐 Deployment

The application is deployed on **Vercel**.

Before deploying a new version, verify the production build:

```bash
npm run build
```

Then check the following:

- Required environment variables are configured in Vercel.
- Authentication and OAuth callback URLs use the correct production domain.
- Product and category APIs return valid data.
- Login, registration, logout, and protected routes work correctly.
- Dynamic routes load correctly when opened directly or refreshed.
- No build errors or critical runtime errors remain.

---

## 🎯 Project Objective

The goal of BazarDor is to make essential commodity prices easier to explore and compare. By presenting product information, price movements, and market-wise comparisons in a user-friendly interface, the application helps users make more informed shopping decisions.

---

## 👨‍💻 Developer

**Sabid Ahmed**

Full Stack Web Development Learner

---

