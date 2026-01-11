// JSON-LD structured data generators for SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nice Touch',
    url: 'https://nicetouch.app',
    logo: 'https://nicetouch.app/nice-touch-logo.png',
    description: 'AI video editing assistant for professional editors and teams',
    sameAs: [
      'https://www.linkedin.com/company/oohnicetouch/',
      'https://www.youtube.com/@NiceTouch318',
      'https://discord.gg/un462urQKv',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'cooksey@nicetouch.app',
      contactType: 'Customer Support',
    },
  }
}

export function generateSoftwareApplicationSchema(
  name: string,
  description: string,
  applicationCategory = 'MultimediaApplication'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem: ['macOS', 'Windows'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Join Early Access',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
  }
}

interface FAQItem {
  question: string
  answer: string
}

export function generateFAQSchema(questions: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function combinedSchema(...schemas: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      const { '@context': _context, ...rest } = schema as any
      return rest
    }),
  }
}

