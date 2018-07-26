/* eslint-env mocha */
/* global expect, fetchMock, sinon */

beforeEach(() => {
  window.ContactlabLoaderEndpoint = undefined;
  window.ContactlabLoaderDebug = undefined;
  sinon.restore();
});

describe('The loader', () => {
  it('returns a Promise', () => {
    expect(window.cl('ID')).to.be.a('Promise');
  });

  it('fetches config from the default endpoint', () => {
    expect(fetchMock.called()).to.be.true;
  });

  it('appends the snippet to the DOM', () => {
    const scripts = Array.from(document.scripts).map(e => e.outerHTML);
    expect(scripts).to.contain('<script>window.foo = "hello";</script>');
  });

  it('runs the scripts contained in the snippet', () => {
    expect(window.foo).to.equal('hello');
  });
});

describe('Debugging logs', () => {
  it('are disabled by default', () => {
    const log = sinon.fake();
    sinon.replace(console, 'log', log);
    window.cl('ID123');
    sinon.assert.notCalled(log);
  });

  it('can be enabled', () => {
    window.ContactlabLoaderDebug = true;
    const log = sinon.fake();
    sinon.replace(console, 'log', log);
    window.cl('ID123');
    sinon.assert.called(log);
  });
});

describe('The configuration endpoint', () => {
  it('can be overridden', () => {
    fetchMock.get('http://example.com', {});
    window.ContactlabLoaderEndpoint = 'http://example.com';
    window.cl('SOME_ID');
    expect(fetchMock.called('http://example.com')).to.be.true;
  });

  it('can contain a placeholder {{id}}', () => {
    fetchMock.get('http://example.com/SOME_OTHER_ID.json', {});
    window.ContactlabLoaderEndpoint = 'http://example.com/{{id}}.json';
    window.cl('SOME_OTHER_ID');
    expect(fetchMock.called('http://example.com/SOME_OTHER_ID.json')).to.be.true;
  });
});

describe('Edge cases:', () => {
  it('should reject if it fails to fetch the JSON', (done) => {
    fetchMock.get('http://invalid.url', 404);
    window.ContactlabLoaderEndpoint = 'http://invalid.url';
    window.cl('ANY_ID')
      .then(() => {
        done(new Error('promise resolved when rejection expected'));
      })
      .catch(() => {
        done();
      });
  });

  it('should reject if the ID is not found in the JSON', (done) => {
    window.cl('MISSING_ID')
      .then(() => {
        done(new Error('promise resolved when rejection expected'));
      })
      .catch(() => {
        done();
      });
  });

  it('should not append any snippet if the ID is not found in the JSON', (done) => {
    const fake = sinon.fake();
    sinon.replace(document.head, 'appendChild', fake);
    window.cl('MISSING_ID')
      .then(() => {
        done(new Error('promise resolved when rejection expected'));
      })
      .catch(() => {
        sinon.assert.notCalled(fake);
        done();
      });
  });
});
