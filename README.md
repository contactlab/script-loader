

# Contactlab Loader


[![Build Status](https://travis-ci.org/contactlab/script-loader.svg?branch=master)](https://travis-ci.org/contactlab/script-loader)
[![GitHub release](https://img.shields.io/github/release/contactlab/script-loader.svg)](https://github.com/contactlab/script-loader/releases)


Similar to a [Tag manager](https://en.wikipedia.org/wiki/Tag_management_system),
this script allows Contactlab clients to insert a single JavaScript tag in their
web pages with a single client ID. The script will asynchrounsly load other tags
and configurations based on the client ID.

## How to use

Insert this snippet in your website (preferably in the `<HEAD>` section):

```html
  <script>
  window.cl=function(){(cl.q=cl.q||[]).push(arguments)};
  cl('EXAMPLE_ID');
  </script>
  <script async src='https://assets.contactlab.it/script-loader/latest/script-loader.min.js'></script>
```

We recommend that you load libraries from the CDN via HTTPS, even if your own
website only uses HTTP.

## ID

To use the Loader, you need an ID identifying your website. This ID is all you
need to get started: simply replace `EXAMPLE_ID` with your ID in the example
above.

## Compatibility

The Loader has been tested with the latest versions of Chrome, Firefox, Safari
and Edge, including mobile versions.

On older browsers, the script is designed to silently disable itself without
generating warnings or errors.

If you notice an issue with a specific browser, please open a GitHub issue
specifying the exact browser version and operating system you are using.

## Contributing to this library

`yarn` will install all dependencies.

`yarn lint` will check the code with ESLint.

`yarn test` will run all tests once using Chrome Headless and Puppeteer.

`yarn test-watch` will automatically re-run tests on every change.
