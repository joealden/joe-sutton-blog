/**
 * NOTE:
 *
 * This declaration means that files that end in `.woff2`
 * don't throw errors when imported like modules. This is
 * needed to get the final location of the font in order
 * to preload it in `src/html.tsx`.
 */

declare module "*.woff2";
