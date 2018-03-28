import Route from './Route';

describe('Route', () => {
  describe('#construct', () => {
    it('sets path ', () => {
      expect(new Route('test').path).toEqual('/test');
    });
  });

  describe('.getPrefixedValue', () => {
    it('returns value prefixed with /', () => {
      expect(Route.getPrefixedValue('test')).toEqual('/test');
      expect(Route.getPrefixedValue('/test')).toEqual('/test');
    });
  });

  describe('.get', () => {
    it('returns url with arguments', () => {
      const route = new Route('name');
      route.with = jest.fn();

      Route.get('name', 'params', 'search', 'hash');
      expect(route.with).toHaveBeenCalledWith('params', 'search', 'hash');
    });

    it('throws error if route has not been registered', () => {
      Route.routes = {};
      expect(() => Route.get('name')).toThrowError();
    });
  });

  describe('#path', () => {
    it('returns prefixed options.path if it exists', () => {
      const route = new Route('name', { path: 'path' });
      expect(route.path).toEqual('/path');
    });

    it('guesses name without namespace', () => {
      const route = new Route('route');
      expect(route.path).toEqual('/route');
    });

    it('guesses name with namespace paths', () => {
      new Route('namespace', { path: 'test' });
      const route = new Route('namespace.route');
      expect(route.path).toEqual('/test/route');
    });

    it('concatenates path and namespace paths without noNamespacePath', () => {
      new Route('namespace');
      const route = new Route('namespace.route', { path: 'abc/:id' });
      expect(route.path).toEqual('/namespace/abc/:id');
    });

    it('ignores namespace path if noNamespacePath=true', () => {
      new Route('namespace', { path: 'test' });
      const route = new Route('namespace.route', { noNamespacePath: true });
      expect(route.path).toEqual('/route');
    });

    it('throws an error if the namespace does not exist', () => {
      Route.routes = {};
      expect(() => new Route('namespace.route')).toThrowError();
    });
  });

  describe('#with', () => {
    it('injects params', () => {
      const route = new Route('route/:id/:secondId');
      expect(route.with({ id: 1, secondId: 2 })).toEqual('/route/1/2');
    });

    it('throws error if param is not in the url', () => {
      const route = new Route('route');
      expect(() => route.with({ id: 1 })).toThrowError();
    });

    it('adds search and hash', () => {
      const route = new Route('route');
      expect(route.with(null, 'a=b', 'hashValue')).toEqual('/route?a=b#hashValue');
    });
  });
});
