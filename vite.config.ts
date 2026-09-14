import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Compile down to syntax that older Android browsers / in-app WebViews understand.
  build: { target: ["es2019", "chrome80", "safari13"] },
  esbuild: { target: "es2019" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: true },
    pages: [{ path: "/" }, { path: "/privacy" }],
  },
  // Pin the build output so CI providers (e.g. Netlify) don't auto-detect their own
  // preset and emit the server somewhere the prerender pass can't find it.
  nitro: {
    preset: "cloudflare-module",
    output: {
      dir: "dist",
      serverDir: "dist/server",
      publicDir: "dist/client",
    },
  },
});
