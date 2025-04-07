const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  try {
    // Clean the endpoint and API URL to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    const cleanApiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL
    
    // Construct the full URL
    const fullUrl = `${cleanApiUrl}/${cleanEndpoint}`
    
    // Log the request details
    console.log('Making API request to:', fullUrl)

    // Set default headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    }

    // Make the fetch request
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    })

    // Log response status
    console.log('Response status:', response.status)

    // Check if the response was successful
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = JSON.parse(errorText)
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch (e) {
        // If we can't parse the error as JSON, use the raw text
        errorMessage = errorText || errorMessage
      }
      
      // If it's an authentication error, clear the token
      if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      
      throw new Error(errorMessage)
    }

    // Get the response text
    const responseText = await response.text()
    
    // Log the raw response text for debugging
    console.log('Raw response:', responseText)

    // Try to parse the response as JSON
    try {
      const data = JSON.parse(responseText)
      console.log('Parsed response data:', data)
      return data
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText)
      throw new Error('Server returned an invalid response format')
    }
  } catch (error: any) {
    console.error('API request failed:', error)
    throw error
  }
}

