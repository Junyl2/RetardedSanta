# Retard Santa

A static Next.js landing page for the Retard Santa community.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run typecheck`, `npm run lint`, and `npm run build` for validation. The production static export is in `out/`.

## Project links

Set `telegramUrl` and `xUrl` in `src/config/project.ts` to the verified official URLs. Until configured, the community calls to action are visibly marked as coming soon and are not clickable. `contractAddress` is reserved for a verified address if needed later.
