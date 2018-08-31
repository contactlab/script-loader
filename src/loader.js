const fetchPonyfill = require('fetch-ponyfill');
const Promise = require('core-js/library/fn/promise');

const fetch = window.fetch ||
              (Object.create && fetchPonyfill({ Promise }).fetch);

const debug = (msg) => {
  const loaderDebug = window.ContactlabLoaderDebug || false;

  if (loaderDebug) {
    console.log(`ContactlabLoader: ${msg}`); // eslint-disable-line
  }
};

const Loader = (id) => {
  const promise = new Promise((resolve, reject) => {
    const loaderEndpoint = window.ContactlabLoaderEndpoint || 'https://loader-conf.contactlab.it/';
    debug(`Using endpoint "${loaderEndpoint}"`);
    const entpointTemplate = `${loaderEndpoint.replace(/\/$/, '')}/{{id}}`;
    debug(`Invoking with id "${id}"`);
    const endpoint = entpointTemplate.replace('{{id}}', id);
    debug(`Fetching config from ${endpoint}`);
    fetch(endpoint).then(response => {
      return response.json();
    }).then(stuff => {
      if (stuff && stuff.script) {
        const script = stuff.script;
        debug(`Found script to insert "${script}"`);
        const range = document.createRange();
        range.setStart(document.head, 0);
        document.head.appendChild(
          range.createContextualFragment(script)
        );
      } else {
        debug('Could not find a valid JSON configuration');
        reject();
      }
      resolve();
    }, () => {
      debug('Could not fetch configuration');
      reject();
    });
  });

  return promise;
};

// Process queue
const varName = window.ContactlabLoaderFunction || 'cl';
if (window[varName] && window[varName].q) {
  if (Array.prototype.map) { // Old IEs are not supported
    const q = window[varName].q;
    q.map(id => Loader(id[0]));
  }
}
// Replace queue with Loader function
window.cl = Loader;
