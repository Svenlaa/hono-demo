# hono-demo

## setup
```
pnpm install
pnpm dev
```

## environment
in production cloudflare uses the IDs set in `wrangler.toml`. if your account has access to the IDs, they will be used.

during development, a local database is made in the `.wrangler/` directory using the IDs set in `wrangler.toml`

## deployments
cloudflare workers automatically detects and deploys changes on the `main` branch.
