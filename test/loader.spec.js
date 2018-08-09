/* eslint-env mocha */
/* global expect */

import sinon from 'sinon';

beforeEach(() => {
  window.ContactlabLoaderEndpoint = undefined;
  window.ContactlabLoaderDebug = undefined;
  sinon.restore();
});

describe('The loader', () => {
  it('returns a Promise', () => {
    expect(window.cl('any-id')).to.be.a('Promise');
  });

  it('fetches config from the default endpoint', () => {
    expect(window.fetchMock.called()).to.be.true;
  });

  it('appends the snippet to the DOM', (done) => {
    window.cl('test-sample').then(() => {
      const scripts = Array.from(document.scripts).map(e => e.outerHTML);
      expect(scripts).to.contain('<script>window.foo = "hello";</script>');
      done();
    }).catch(() => { done(new Error('promise rejected')); });
  });

  it('runs the scripts contained in the snippet', (done) => {
    window.cl('test-sample').then(() => {
      expect(window.foo).to.equal('hello');
      done();
    }).catch(() => { done(new Error('promise rejected')); });
  });
});

describe('Debugging logs', () => {
  it('are disabled by default', () => {
    const log = sinon.fake();
    sinon.replace(console, 'log', log);
    window.cl('id-123');
    sinon.assert.notCalled(log);
  });

  it('can be enabled', () => {
    window.ContactlabLoaderDebug = true;
    const log = sinon.fake();
    sinon.replace(console, 'log', log);
    window.cl('id-123');
    sinon.assert.called(log);
  });
});

describe('The configuration endpoint', () => {
  it('can be overridden', () => {
    window.fetchMock.get('http://example.com/some-id', {});
    window.ContactlabLoaderEndpoint = 'http://example.com';
    window.cl('some-id');
    expect(window.fetchMock.called('http://example.com/some-id')).to.be.true;
  });

  it('can be overridden with an optional trailing slash', () => {
    window.fetchMock.get('http://example.com/with-trailing-slash/some-id', {});
    window.ContactlabLoaderEndpoint = 'http://example.com/with-trailing-slash/';
    window.cl('some-id');
    expect(window.fetchMock.called('http://example.com/with-trailing-slash/some-id')).to.be.true;
  });

  it('can be overridden omitting the optional trailing slash', () => {
    window.fetchMock.get('http://example.com/without-trailing-slash/some-id', {});
    window.ContactlabLoaderEndpoint = 'http://example.com/without-trailing-slash';
    window.cl('some-id');
    expect(window.fetchMock.called('http://example.com/without-trailing-slash/some-id')).to.be.true;
  });
});

describe('Edge cases:', () => {
  it('should reject if it fails to fetch the JSON', (done) => {
    window.fetchMock.get('http://invalid.url/any-id', 404);
    window.ContactlabLoaderEndpoint = 'http://invalid.url';
    window.cl('any-id')
      .then(() => {
        done(new Error('promise resolved when rejection expected'));
      })
      .catch(() => {
        done();
      });
  });

  it('should not append any snippet if one of [script] is not found in the JSON', (done) => {
    const fake = sinon.fake();
    sinon.replace(document.head, 'appendChild', fake);
    window.fetchMock.get('http://example.com/empty-json/some-id', {});
    window.ContactlabLoaderEndpoint = 'http://example.com/empty-json';
    window.cl('some-id')
      .then(() => {
        done(new Error('promise resolved when rejection expected'));
      })
      .catch(() => {
        sinon.assert.notCalled(fake);
        done();
      });
  });
});
