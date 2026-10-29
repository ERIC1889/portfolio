import type { NextConfig } from 'next'

const YEARS = [2023, 2024, 2025, 2026]

// agentRules: false stops `next dev` from writing AGENTS.md into the repo (only README and code are published).
const nextConfig: NextConfig = {
  agentRules: false,
  // The four year pages became one story page; old links land on the matching year.
  async redirects() {
    return YEARS.map((year) => ({ source: `/journey/${year}`, destination: `/story#y${year}`, permanent: true }))
  },
}

export default nextConfig
