import { useEffect } from 'react'
import type { ReactElement } from 'react'

function NewsletterForm(): ReactElement {
  useEffect(() => {
    // Load HubSpot form script dynamically
    const script = document.createElement('script')
    script.src = 'https://js-eu1.hsforms.net/forms/embed/146425863.js'
    script.defer = true
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    
    // Append script to document
    document.body.appendChild(script)

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="newsletter-form-container">
      <h1 className="newsletter-title">Stay Updated</h1>
      <p className="newsletter-subtitle">
        Subscribe to our newsletter for the latest updates and features. No Spam. Unsub anytime.
      </p>
      <div 
        className="hs-form-frame" 
        data-region="eu1" 
        data-form-id="98567906-bbd8-4dde-99f6-4581261e62cf" 
        data-portal-id="146425863"
      />
    </div>
  )
}

export default NewsletterForm

