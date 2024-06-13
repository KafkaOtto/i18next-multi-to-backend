# Introduction

[![Actions](https://github.com/i18next/i18next-resources-to-backend/workflows/node/badge.svg)](https://github.com/i18next/i18next-resources-to-backend/actions?query=workflow%3Anode)
[![Actions deno](https://github.com/i18next/i18next-resources-to-backend/workflows/deno/badge.svg)](https://github.com/i18next/i18next-resources-to-backend/actions?query=workflow%3Adeno)
[![npm version](https://img.shields.io/npm/v/i18next-resources-to-backend.svg?style=flat-square)](https://www.npmjs.com/package/i18next-resources-to-backend)

Taking insipration from [i18next-resources-to-backend](https://github.com/i18next/i18next-resources-to-backend.git) this package enrich the functionality by
support more file formats in i18next.
This package helps to transform resources to an i18next backend. To be used in Node.js, in the browser and for Deno.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-multi-to-backend).

```bash
# npm package
$ npm install i18next-multi-to-backend
```

## simple example - dynamic imports (lazy load in memory translations)

i18next-resources-to-backend helps to transform resources to an i18next backend. This means you can lazy load translations.

The dynamic import must be passed a string. Webpack will fail to load the resource if you pass a variable to `import()`.

For example, when using webpack with json:

```js
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(multiResourcesBackend(
    (language:any, namespace:any) => import(`./content/${namespace}/${namespace}-config-${language}.json`)
  ),)
  .on('failedLoading', (lng, ns, msg) => console.error(msg);
  .init({ /* other options */ })
```

Or you can import other file format
```js
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(multiResourcesBackend(
    (language:any, namespace:any) => import(`./content/markdown/${namespace}-${language}.md`), 'content'
  ),)
  .on('failedLoading', (lng, ns, msg) => console.error(msg);
  .init({ /* other options */ })
```

Then you can use key 'content' to access the corresponding namespace and language markdown file content.

## used as fallback in combination with another i18next backend

i.e. [Browser fallback with local / bundled translations](https://www.i18next.com/how-to/backend-fallback#browser-fallback-with-local-bundled-translations)

Wiring up:

```js
import i18next from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import HttpBackend from 'i18next-http-backend'

i18next.use(ChainedBackend)
  .use(ChainedBackend)
  .init<ChainedBackendOptions>({
  fallbackLng: supportedLanguages[0],
  lng: supportedLanguages[0], //default language
  supportedLngs: supportedLanguages,
  defaultNS: "about",
  backend: {
    backends: [
      multiResourcesBackend(
        (language:any, namespace:any) => import(`./content/${namespace}/${namespace}-config-${language}.json`)
      ),
      multiResourcesBackend(
        (language:any, namespace:any) => import(`./content/markdown/${namespace}-${language}.md`), 'content'
      )
    ]
  }
});
```
