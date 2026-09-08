/*
 * <license header>
 */

// `config.json` is generated at build time by `aio app build` (a map of
// action names to their deployed Runtime URLs) and is gitignored, so it is
// absent during CI type-checking. This ambient declaration lets `tsc`
// resolve the import without the file being present.
declare module '*/config.json' {
  const value: Record<string, string>
  export default value
}
