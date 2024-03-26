import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ['**/*.e2e-spec.ts'],
    environmentMatchGlobs: [
      [
        // Aqui tava o caminho errado
        'src/infra/http/controllers/**',
        // A atualização permite apontar diretamente para o arquivo.
        './prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
    dir: 'src',
    globals: true,
    root: './',
  },
})
