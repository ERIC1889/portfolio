import type { NextConfig } from 'next'

// agentRules: false stops `next dev` from writing AGENTS.md into the repo (only README and code are published).
const nextConfig: NextConfig = { agentRules: false }

export default nextConfig
