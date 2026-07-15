// Privacy Policy content
// UK GDPR compliant. Nice Touch Group Ltd (Companies House: 16674872)
// Updated: July 2026

export const PRIVACY_HERO = {
  heading: 'Privacy Policy',
  subtitle:
    'Nice Touch Group Ltd is committed to protecting your personal data. This policy explains what we collect, why we collect it, and how we keep it safe.',
  updated: 'Last updated: July 2026',
}

export interface PrivacySection {
  heading: string
  body?: string
  items?: string[]
  rows?: { label: string; value: string }[]
}

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    heading: 'Who we are',
    body:
      'Nice Touch Group Ltd is a company registered in England and Wales (Companies House number 16674872). We build Nice Touch, an AI-powered workflow and edit assistant for professional video post-production teams. When this policy refers to \u201cNice Touch\u201d, \u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d, it means Nice Touch Group Ltd.',
  },
  {
    heading: 'What data we collect',
    body: 'We collect and process the following categories of personal data:',
    items: [
      'Account information: name, email address, and password (stored as a secure hash) when you register.',
      'Profile information: organisation name, team membership, and role within your account.',
      'Usage data: records of AI edit generations, asset analysis activity, project usage, and feature interactions.',
      'Project content: names of files you upload for analysis, transcripts generated from those files, project briefs, notes, and timeline data. This content is processed solely to deliver the service to you.',
      'Communications: if you contact us by email or through in-app reporting, we retain those communications.',
      'Technical data: app version, operating system, and diagnostic information collected for error reporting and service reliability. This includes application logs transmitted automatically from the desktop app to our monitoring infrastructure, containing session identifiers, error details, and performance data.',
    ],
  },
  {
    heading: 'How we use your data',
    body: 'We process your data on the following lawful bases:',
    items: [
      'Contract performance: to provide the Nice Touch service you have signed up to, including operating the AI assistant, processing your media, and managing your account.',
      'Legitimate interests: to improve the product, monitor service reliability, and understand usage patterns at an aggregated level. We do not use your project content to train AI models.',
      'Legal obligation: where we are required to retain or disclose data by law.',
      'Consent: where we have asked for your consent, for example for marketing communications.',
    ],
  },
  {
    heading: 'Where your data is stored',
    body:
      'All Nice Touch infrastructure is hosted within the United Kingdom. The third-party services we use to deliver the product predominantly process data in the European Union. Some AI services and Google authentication perform processing in the US.',
    items: [
      'Where any third-party processor is located outside the UK, we ensure appropriate safeguards are in place \u2014 such as Standard Contractual Clauses \u2014 and that your data is not retained for any purpose beyond delivering the service. We take appropriate steps to ensure this remains the case as our infrastructure evolves.',
    ],
  },
  {
    heading: 'Data retention',
    body:
      'We retain your account and usage data for as long as your account is active. If you close your account, we will delete or anonymise your personal data within 90 days, except where we are required by law to retain it for longer. Project content \u2014 media files, transcripts, briefs \u2014 is retained for as long as it exists within your account. You can delete individual assets and projects at any time.',
  },
  {
    heading: 'Your rights',
    body: 'Under UK GDPR, you have the right to:',
    items: [
      'Access the personal data we hold about you',
      'Correct inaccurate or incomplete data',
      'Request erasure of your data (\u201cright to be forgotten\u201d)',
      'Restrict or object to certain processing',
      'Receive your data in a portable format',
      'Withdraw consent where processing is based on consent',
    ],
  },
  {
    heading: 'Cookies',
    body:
      'Our website and web application use essential cookies required for authentication and session management. We do not use advertising or tracking cookies. Where analytics are used, data is processed in aggregated, anonymised form only.',
  },
  {
    heading: 'Security',
    body:
      'We implement appropriate technical and organisational measures to protect your personal data.',
  },
  {
    heading: 'Changes to this policy',
    body:
      'We may update this Privacy Policy from time to time. Where changes are material, we will notify you by email or via an in-app notice. The \u201clast updated\u201d date at the top of this page will reflect the current version.',
  },
]

// IMPORTANT: Replace HUBSPOT_PRIVACY_REQUEST_URL with the published URL from
// HubSpot Settings → Privacy & Consent → Privacy tools → data privacy request page.
// The URL will be on a HubSpot domain (e.g. privacy.hs-sites.com/nice-touch/...)
export const PRIVACY_CONTACT = {
  heading: 'Exercise your data rights',
  body: 'To request access to, correction of, or deletion of your personal data, use our online data request form.',
  requestFormUrl: 'https://eu1.hs-data-privacy.com/request/WFB3NpLcVFGPzMXf9aID6Q',
  requestFormLabel: 'Submit a data request',
  company: 'Nice Touch Group Ltd',
  registration: 'Registered in England and Wales (16674872)',
  ico: 'You also have the right to lodge a complaint with the Information Commissioner\u2019s Office (ICO) at ico.org.uk.',
}
