# CloudVault

Next.js App Router + React 19 + Tailwind CSS v4 premium cloud storage dashboard.

## Development Server

```bash
pnpm dev
```

Runs on [http://localhost:5173](http://localhost:5173). Auth and user requests use `VITE_API_URL` / `NEXT_PUBLIC_API_URL`.

- Local default: `http://localhost:3001/api`
- Current `.env.local` / prod example: [https://file-storage-seven-neon.vercel.app/api](https://file-storage-seven-neon.vercel.app/api)

## Project Structure

- `src/app/layout.tsx` — Root layout, Inter via `next/font`, metadata
- `src/app/globals.css` — Tailwind v4 + neumorphic theme
- `src/app/(auth)/` — Login, register, forgot password, and reset password pages
- `src/app/(dashboard)/` — Dashboard route group with section pages
- `src/app/(dashboard)/[section]/page.tsx` — `/drive`, `/recent`, `/favorites`, etc.
- `src/components/` — UI, layout, files, modal, and auth components
- `src/hooks/` — `useAuth`, `useDashboard`, `useMediaQuery`
- `src/lib/api/` — File Storage API client, token storage, and rotating refresh
- `src/lib/auth/` — Client-side validation and account mapping
- `src/lib/data/` — Mock data accessors (swap for APIs later)
- `src/lib/constants/icons.ts` — SVG path map
- `src/types/` — Shared TypeScript types
- `package.json` — Dependencies and scripts
- `next.config.ts` — Next.js configuration
- `postcss.config.mjs` — Tailwind CSS v4 PostCSS plugin

## Dependencies

- Runtime: Next.js 15, React 19, React DOM 19
- Styling: Tailwind CSS v4 with `@tailwindcss/postcss`
- Tooling: TypeScript 5.7+, ESLint (`eslint-config-next`), oxfmt

## Styling

Use Tailwind utilities in JSX. Global theme tokens and neumorphic classes live in `src/app/globals.css`. Font is wired through `next/font` in the root layout.

## Code quality

- Prefer named exports for shared components; default exports for `page.tsx` / `layout.tsx`
- Use double quotes for strings containing apostrophes, or escape them in single-quoted strings
- Keep components focused; read files through `lib/data` accessors rather than embedding mock arrays in UI
