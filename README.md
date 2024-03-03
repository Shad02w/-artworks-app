# Artworks App

This application is built using Next.js, Tailwind CSS, zustand and Shadcn and  [Art Institute of Chicago API](https://api.artic.edu/docs/) 

[Live Demo](https://artworks-app-six.vercel.app/) at vercel

## Features

- Used SSR to achieved great SEO performance in specific page, prevented layout shift during image loading.

- Created Inifinite scroll list for artworks view, autoload artworks when user reaching bottom of the screen. It is more intuitive experience for mobile

- Fully Responsive, from layout to images

- Provided great user experiences for viewing artworks' images

- All the reusable UI components are grouped into `components` directory for maintainability. All the componenst with businesses logics are placed under `app` directory and organized using Routes Group

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

## 
