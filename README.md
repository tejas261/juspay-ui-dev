# Juspay UI Developer Assignment — Dashboard

This project is a responsive, modern UI dashboard built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS** for Juspay’s UI Developer assignment.

It includes an e-commerce dashboard overview and an order history page, both designed with interactive charts, paginated and filterable tables, and reusable UI components.

---

## 🚀 Features

- **Modern React (v19) with TypeScript** for robust app structure.
- **Vite** fast build tooling.
- **Tailwind CSS** for rapid, responsive styling.
- **Radix UI** component primitives and **Lucide** icons.
- **Recharts** for visualizing key metrics (bar, line, donut).
- Fully responsive layout: sidebar, navbar, info panel.
- **Order History** page: paginated, searchable, filterable, and sortable.
- **Interactive UI component library**: buttons, inputs, forms, avatars, dialogs, etc.
- Accessible and theme-ready (supports light/dark mode).

---

## 🛠️ Local Setup & Development

### 1. Clone the repository

```sh
git clone https://github.com/tejas261/juspay-ui-dev.git
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start development server

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### 4. Build for production

```sh
npm run build
```

### 5. Preview production build

```sh
npm run preview
```

---

## 📁 Project Structure

```
src/
  components/
    charts/           # Custom chart components
    layout/           # Navbar, Sidebar, InfoSection
    pages/            # Dashboard & OrderHistory page
    ui/               # Reusable UI primitives
  contexts/           # React contexts (e.g. UI state)
  hooks/              # Custom hooks
  lib/                # Utility functions
  App.tsx             # Root component
  main.tsx            # Startup entry
public/               # Static images/icons
  activities/
  contacts/
```

---

## 🖥️ Page Overview

### Dashboard (default page)

- **Stats cards**: Key metrics (Customers, Orders, Revenue, Growth) with trend indicators.
- **Projections vs Actuals**: Comparative bar chart.
- **Revenue Trends**: Line/area chart for weekly revenue.
- **Revenue by Location**: Progress bars by city.
- **Top Selling Products**: Table of products.
- **Sales Breakdown**: Donut chart visualizing channels.

### Order History

- **Order list**: Paginated, filterable, and sortable order table.
- **Search**: Quick search by id, user, project, address, date, or status.
- **Multiple filters**: Date, Status.
- **Selection**: Bulk or item selection (checkboxes).
- **Actionable UI**: Placeholder for actions (add, more, sort, filters).

---

## ⚙️ Design Decisions & Challenges

- **Componentization**: Every visual element (charts, tables, stats, etc.) is a reusable, typed component for maintainability and extensibility.
- **Tailwind + Radix**: Combined for rapid styling and robust, accessible primitives.
- **State Management**: Local state + a small context for global navigation.
- **Accessibility**: Leveraged Radix and best practices for focus, roles, and keyboard nav.
- **Responsiveness**: Built entirely mobile-first with breakpoints for a dashboard context.
- **Data Gen**: Seeded with deterministic dummy data for tables and charts.
- **Charts**: Used Recharts for flexibility and quick customization.
- **Dark Mode**: Using

### Improvements & Next Steps

- Hook up to a real API (currently all data is static/fake).
- Add unit & integration tests (none present).
- Add login/auth flows before dashboard access.
- Enhanced error boundaries & loading states.
- Expand components for more pages (user/profile management, settings, etc.)
- Make theme switcher UI exposed in app.

---

## 📝 Scripts

- `npm run dev` – Start local server.
- `npm run build` – Production build.
- `npm run preview` – Preview built app.
- `npm run lint` – Run ESLint on all files.

---

## 📦 Tech Stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) Primitives
- [Recharts](https://recharts.org/) Charts
- [Lucide icons](https://lucide.dev/)
- [ESLint](https://eslint.org/)
- [Lucide Icons](https://lucide.dev/) (For icons)

---

## 👤 Author

Assignment by Juspay.  
Developed by Tejas M.
