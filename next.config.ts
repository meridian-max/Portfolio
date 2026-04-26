import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  options: {
    remarkPlugins: [[remarkGfm, { 
      singleTilde: false,
      tablePipeAlign: true,
      tableCellPadding: true
    }]],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {},
}

export default withMDX(nextConfig)
