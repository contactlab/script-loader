import fetchMock from 'fetch-mock';

const defaultEndpoint = 'https://loader-conf.contactlab.it/';

window.fetchMock = fetchMock.get(`begin:${defaultEndpoint}`, {
  script: '<script>window.foo = "hello";</script>'
});

window.cl = function() {(window.cl.q = window.cl.q || []).push(arguments);};
window.cl('test-example');
