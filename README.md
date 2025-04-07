# 3D Fashion E-commerce Platform

A modern e-commerce platform built with Next.js 14, featuring 3D product visualization, user authentication, and a seamless shopping experience.

## Features

- 3D Product Visualization
- User Authentication
- Shopping Cart
- Product Categories (Men's, Women's, Kids')
- Responsive Design
- Modern UI with Animations

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js (for 3D visualization)
- Shadcn UI Components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Ls220/AdvancedWebA2.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_API_URL=/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── ...               # Page routes
├── public/               # Static files
│   └── models/          # 3D model files
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 