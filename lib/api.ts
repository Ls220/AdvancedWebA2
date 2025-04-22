const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  try {
    // Remove leading/trailing slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    const cleanApiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL
    
    const fullUrl = `${cleanApiUrl}/${cleanEndpoint}`
    
    console.log('Making API request:', {
      url: fullUrl,
      method: options.method || 'GET',
    })

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    }

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      throw new Error(
        errorData.error || errorData.message || `HTTP error! status: ${response.status}`
      )
    }

    const responseText = await response.text()
    if (!responseText) {
      return null
    }

    try {
      return JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse response as JSON:', e)
      throw new Error('Invalid JSON response from server')
    }
  } catch (error: any) {
    console.error('API request failed:', {
      endpoint,
      error: error.message
    })
    throw error
  }
}

