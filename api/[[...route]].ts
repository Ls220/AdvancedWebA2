import { createProxyMiddleware } from "http-proxy-middleware"
import type { NextApiRequest, NextApiResponse } from "next"

// proxy instance
const apiProxy = createProxyMiddleware({
  target: process.env.API_URL || "http://localhost:5000",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/api", // API path rewrite
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

