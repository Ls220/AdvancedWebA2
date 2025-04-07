import { createProxyMiddleware } from "http-proxy-middleware"
import type { NextApiRequest, NextApiResponse } from "next"

// Create proxy instance outside of handler to reuse
const apiProxy = createProxyMiddleware({
  target: process.env.API_URL || "http://localhost:5000",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/api", // rewrite path
  },
})

// Disable body parsing, we need the raw body for the proxy
export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore - http-proxy-middleware types don't match Next.js types exactly
  return apiProxy(req, res)
}

