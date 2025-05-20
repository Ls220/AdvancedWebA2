"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Add gtag to window object
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        page_path?: string
        [key: string]: any
      }
    ) => void
  }
} 