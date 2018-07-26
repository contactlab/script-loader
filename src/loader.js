import fetchPonyfill from 'fetch-ponyfill';

const fetch = window.fetch || fetchPonyfill({ Promise }).fetch;

const debug = (msg) => {
  const loaderDebug = window.ContactlabLoaderDebug || false;

  if (loaderDebug) {
    console.log(`ContactlabLoader: ${msg}`); // eslint-disable-line
  }
};

const Loader = (id) => {
  const promise = new Promise((resolve, reject) => {

    // TODO: replace default endpoint with production endpoint
    const loaderEndpoint = window.ContactlabLoaderEndpoint || 'https://otcybcnpcfjrvwkzhm.our.buildo.io/https://loader-configs-axsvjinwnn.now.sh/{{id}}.json';

    debug(`Invoked with id "${id}"`);
    const endpoint = loaderEndpoint.replace('{{id}}', id);
    debug(`Fetching config from ${endpoint}`);
    fetch(endpoint).then(response => {
      return response.json();
    }).then(stuff => {
      if (stuff[id] && stuff[id].script) {
        const script = stuff[id].script;
        debug(`Found script to insert "${script}"`);
        const range = document.createRange();
        range.setStart(document.head, 0);
        document.head.appendChild(
          range.createContextualFragment(script)
        );
      } else {
        debug(`Could not find a valid JSON configuration for id "${id}"`);
        reject();
      }
      resolve();
    }).catch(() => {
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
