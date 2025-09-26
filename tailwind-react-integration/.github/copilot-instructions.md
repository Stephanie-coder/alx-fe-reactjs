# Copilot Instructions for tailwind-react-integration

## Project Overview
This is a minimal React + Vite project, integrating Tailwind CSS for styling. The architecture is simple and modular, with all source code in the `src/` directory. The project is designed for rapid prototyping and learning, not for production use.

## Key Directories & Files
- `src/` — Main source code
  - `App.jsx` — Root React component
  - `components/` — Reusable React components (e.g., `UserProfile.jsx`)
  - `assets/` — Static assets (SVGs, images)
  - `main.jsx` — Entry point, renders `<App />`
  - `index.css`, `App.css` — Global and app-level styles
- `public/` — Static files served by Vite
- `index.html` — Main HTML template
- `vite.config.js` — Vite configuration
- `eslint.config.js` — ESLint rules

## Build & Run Workflows
- **Start Dev Server:**
  ```powershell
  npm run dev
  ```
- **Build for Production:**
  ```powershell
  npm run build
  ```
- **Preview Production Build:**
  ```powershell
  npm run preview
  ```
- **Lint:**
  ```powershell
  npm run lint
  ```

## Patterns & Conventions
- **Component Structure:**
  - Use functional components and hooks (no class components).
  - Place reusable components in `src/components/`.
  - Use Tailwind CSS utility classes for styling (avoid custom CSS unless necessary).
- **Imports:**
  - Use relative imports within `src/`.
  - Import assets from `src/assets/`.
- **No TypeScript:**
  - This template uses plain JavaScript (JSX). TypeScript is not enabled.
- **No Custom Routing:**
  - There is no router setup; all logic is in `App.jsx` and its children.

## Integration Points
- **Tailwind CSS:**
  - All styling uses Tailwind utility classes. See `index.css` for Tailwind setup.
- **Vite Plugins:**
  - Uses `@vitejs/plugin-react` for React Fast Refresh.

## Example: Adding a Component
1. Create a new file in `src/components/`, e.g., `MyComponent.jsx`.
2. Use Tailwind classes for styling:
   ```jsx
   export default function MyComponent() {
     return <div className="p-4 bg-blue-100">Hello!</div>;
   }
   ```
3. Import and use in `App.jsx`:
   ```jsx
   import MyComponent from './components/MyComponent';
   // ...
   <MyComponent />
   ```

## References
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---
If any conventions or workflows are unclear, please provide feedback so this guide can be improved.
