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


export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  return apiProxy(req, res)
}

