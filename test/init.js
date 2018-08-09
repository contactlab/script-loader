import fetchMock from 'fetch-mock';

const defaultEndpoint = 'https://script-loader-json-test.now.sh/json/';

window.fetchMock = fetchMock.get(`begin:${defaultEndpoint}`, {
  script: '<script>window.foo = "hello";</script>'
});

window.cl = function() {(window.cl.q = window.cl.q || []).push(arguments);};
window.cl('test-example');
