This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Configuration

This project uses Axios for API requests. The base URL for the API is configured using an environment variable. To change the API endpoint, edit the `.env.local` file at the root of the project:

```
NEXT_PUBLIC_API_BASE_URL=https://www.themealdb.com/api/json/v1/1/
```

The Axios instance in `src/lib/api.ts` will automatically use this value.

## Features history

- handle Type search storage on the Session, so on every refresh the user should have always the same selection
- Search state is now managed globally with Zustand for a more scalable and maintainable architecture
- The search input now features a custom focus style: instead of a border, the background darkens for better UX
- The search result by ingredient uses a dedicated component, which is lazy loaded. This separation is necessary to enable true lazy loading and code splitting, so only the content visible on the screen is loaded, improving performance and user experience especially for large result sets.
- fine tuning for search, in the home page removed the binding with the store for the query, still to fix the flikering for the searchType that recover data from the store

### nice to have

A set of feature that i would add if i have more time

- clear search X like google on input
- integrate playwright
- use the dictionay build-in in Next for labels
