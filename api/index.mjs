// Vercel serverless entry point for Angular SSR.
//
// Vercel's Angular framework preset only serves the static `browser/` output
// and never deploys the `server/` bundle, so on-demand routes (RenderMode.Server)
// 404 on direct load. This function bridges Vercel to the Angular server engine:
// vercel.json rewrites every non-static path here, and we hand the request to
// `reqHandler` (createNodeRequestHandler) exported by src/server.ts.
//
// The import is a runtime `import()` (not a static import) so Vercel's build-time
// file tracing doesn't try to resolve dist/ before `ng build` has produced it.
// Hoisting it to a module-level promise warms the import during cold start in
// parallel with function init, instead of blocking the first request on it.
const reqHandlerPromise = import('../dist/Civica/server/server.mjs').then(
  (m) => m.reqHandler,
);

export default async (req, res) => {
  const reqHandler = await reqHandlerPromise;
  return reqHandler(req, res);
};
