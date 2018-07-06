const varName = window.ContactlabLoaderFunction || 'cl';
// TODO: replace default endpoint with production endpoint
const loaderEndpoint = window.ContactlabLoaderEndpoint || 'https://otcybcnpcfjrvwkzhm.our.buildo.io/https://loader-configs-axsvjinwnn.now.sh/{{id}}.json';
const loaderDebug = window.ContactlabLoaderDebug || false;

const debug = (msg) => {
  if (loaderDebug) {
    console.log(`ContactlabLoader: ${msg}`); // eslint-disable-line
  }
};

const Loader = (id) => {
  debug(`Initialising with id "${id}"`);
  const endpoint = loaderEndpoint.replace('{{id}}', id);
  debug(`Fetching config from ${endpoint}`);
  fetch(endpoint).then(response => {
    return response.json();
  }).then(stuff => {
    const script = stuff[id].script;
    debug(`Found script to insert "${script}"`);
    const range = document.createRange();
    range.setStart(document.head, 0);
    document.head.appendChild(
      range.createContextualFragment(script)
    );
  });
};

// Process queue
if (window[varName] && window[varName].q) {
  if (Array.prototype.map) { // Old IEs are not supported
    const q = window[varName].q;
    q.map(id => Loader(id[0]));
  }
}
