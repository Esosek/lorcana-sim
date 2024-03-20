import { renderers } from './renderers.mjs';
import { manifest } from './manifest_Byyrewfn.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DczLXQq5.mjs');
const _page1 = () => import('./chunks/packs_B_XAk9uU.mjs');
const _page2 = () => import('./chunks/sets_DtCeo0Ne.mjs');
const _page3 = () => import('./chunks/index_DEfoB7ml.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/packs.js", _page1],
    ["src/pages/api/sets.js", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "8ff931da-c8c9-4c75-965d-941e4661af83"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
