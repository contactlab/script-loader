import fetchMock from 'fetch-mock';

const defaultEndpoint = 'https://otcybcnpcfjrvwkzhm.our.buildo.io/https://loader-configs-axsvjinwnn.now.sh';

window.fetchMock = fetchMock.get(`begin:${defaultEndpoint}`, {
  EXAMPLE_ID: { script: '<script>window.foo = "hello";</script>' }
});

window.cl = function() {(window.cl.q = window.cl.q || []).push(arguments);};
window.cl('EXAMPLE_ID');
