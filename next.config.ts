import type { NextConfig } from 'next'

const YEARS = [2023, 2024, 2025, 2026]

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      ...YEARS.map((year) => ({ source: `/journey/${year}`, destination: `/story#y${year}`, permanent: true })),
      { source: '/projects/suzihouse', destination: '/projects/finz', permanent: true },
    ]
  },
}

export default nextConfig
