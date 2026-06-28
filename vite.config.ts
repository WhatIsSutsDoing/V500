import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const isGitHubPages = !!process.env.GITHUB_PAGES;
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'Vocab2';

  return {
    base: isGitHubPages ? `/${repoName}/` : '/',
    plugins: [react()],
  }
})