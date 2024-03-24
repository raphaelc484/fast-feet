import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environmentMatchGlobs: [['src/infra/http/contollers/**', 'prisma']],
    dir: 'src',
    globals: true,
    root: './',
  },
})
