// This file helps with environment variable setup for Netlify
// It's not strictly necessary but can help with debugging

// Log that Netlify environment is detected
if (process.env.NETLIFY) {
  console.log("Netlify environment detected")

  // Set default API URL if not provided
  if (!process.env.NEXT_PUBLIC_API_URL) {
    // Use the Netlify URL as the API URL
    process.env.NEXT_PUBLIC_API_URL = process.env.URL || ""
    console.log(`Setting default API URL: ${process.env.NEXT_PUBLIC_API_URL}`)
  }
}

// Export nothing - this file is just for side effects
module.exports = {}

