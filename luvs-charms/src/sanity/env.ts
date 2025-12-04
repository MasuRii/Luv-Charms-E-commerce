export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-04'

// Use fallback values during build time to prevent build failures
// These will be replaced by actual values at runtime via Vercel environment variables
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

// Runtime validation - only warn in development, don't crash the build
if (typeof window !== 'undefined' && !projectId) {
  console.warn(
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID. ' +
    'Please configure this in your Vercel project settings.'
  )
}
