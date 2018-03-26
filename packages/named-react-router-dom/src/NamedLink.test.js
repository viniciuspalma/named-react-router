import * as React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Route from './Route';
import NamedLink from './NamedLink';

describe('<NamedLink />', () => {
  beforeAll(() => {
    new Route('test');
  });

  describe('#render', () => {
    it('returns a <Link /> with to', () => {
      const wrapper = shallow(<NamedLink name="test" from="/from" />);
      expect(wrapper.find('Link').length).toBe(1);
      expect(wrapper.props()).toEqual({ to: '/test', from: '/from', replace: false });
    });

    it('returns a <Link /> with to and other provided options', () => {
      const wrapper = shallow(<NamedLink name="test" from="/from" replace />);
      expect(wrapper.find('Link').length).toBe(1);
      expect(wrapper.props()).toEqual({ to: '/test', from: '/from', replace: true });
    });
  });
});
