import * as React from 'react';
import { shallow } from 'enzyme';
import { Route as ReactRouterRoute } from 'react-router-dom';

import Route from './Route';
import NamedRoute from './NamedRoute';

describe('<NamedRoute />', () => {
  describe('.pathTo', () => {
    it('returns route path', () => {
      new Route('test', { path: 'test/:id' });
      expect(NamedRoute.pathTo('test', { id: 1 }, 'search', 'hash')).toEqual('/test/1?search#hash');
    });
  });

  describe('.render', () => {
    it('returns a <BrowserRoute /> with path and other options', () => {
      const result = NamedRoute.render({ name: 'test', exact: true });
      expect(result.type).toBe(ReactRouterRoute);
      expect(result.props).toEqual({ path: '/test', exact: true });
    });
  });

  describe('#render', () => {
    it('returns a <BrowserRoute /> with path and other options', () => {
      const wrapper = shallow(<NamedRoute name="test" exact />);
      expect(wrapper.find('Route').length).toBe(1);
      expect(wrapper.props()).toEqual({ path: '/test', exact: true });
    });
  });
});
