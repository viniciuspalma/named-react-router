import * as React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import Route from './Route';
import NamedRedirect from './NamedRedirect';

describe('<NamedRedirect />', () => {
  beforeAll(() => {
    new Route('test');
  });

  describe('.render', () => {
    it('returns a <Redirect /> component with to and other options', () => {
      const result = NamedRedirect.render({ name: 'test', exact: true });
      expect(result.type).toBe(Redirect);
      expect(result.props).toEqual({ to: '/test', exact: true, push: false });
    });
  });

  describe('#render', () => {
    it('returns a <Redirect /> with to and other options', () => {
      const wrapper = shallow(<NamedRedirect name="test" exact />);
      expect(wrapper.find('Redirect').length).toBe(1);
      expect(wrapper.props()).toEqual({ to: '/test', exact: true, push: false });
    });
  });
});
