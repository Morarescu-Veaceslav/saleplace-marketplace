# 🎨 SalePlace Frontend

Frontend application for the SalePlace marketplace built with Next.js and Apollo Client.

This application provides a modern UI for browsing, filtering, and managing products, with real-time updates and seamless user experience.

---

## 🚀 Features

- 🔐 Authentication (login / register / session handling)
- 🛍 Product listing & product details pages
- 🔎 Search & filtering via URL query params
- 📄 Pagination system
- ⚡ Debounced filters (optimized UX)
- 🖼 Image preview & upload handling
- 💬 Real-time chat (GraphQL subscriptions)
- 📱 Responsive design
- 🎨 Clean UI with reusable components (shadcn)

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- Apollo Client (GraphQL)
- React Hook Form + Zod validation
- TailwindCSS
- shadcn/ui components

---

## ⚙️ Architecture Highlights

- URL-based filtering (searchParams)
- Server + Client components separation
- Reusable UI components
- Form validation with Zod
- Debounced updates for filters
- Clean separation of concerns

---

## 🌐 API Integration

The frontend communicates with the GraphQL API:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql