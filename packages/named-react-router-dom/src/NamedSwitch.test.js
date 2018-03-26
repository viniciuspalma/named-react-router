import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { StaticRouter, Route as NotNamedRoute } from 'react-router-dom';

import NamedSwitch from './NamedSwitch';
import NamedRoute from './NamedRoute';
import Route from './Route';

describe('<NamedSwitch />', () => {
  it('does not crash with a null child', () => {
    shallow(<NamedSwitch>{null}</NamedSwitch>);
  });

  it('does not crash with a null child', () => {
    shallow(
      <NamedSwitch>
        {null}
        <NamedRoute name="test" />
      </NamedSwitch>
    );
  });

  it('does not call .render on components that do not have it', () => {
    shallow(
      <NamedSwitch>
        <NotNamedRoute path="" />
        <NamedRoute name="test" />
      </NamedSwitch>
    );
  });

  it('calls renderStatic for each method', () => {
    Route.routes = {};

    const wrapper = render(
      <StaticRouter context={{}}>
        <NamedSwitch>
          <NamedRoute name="test" />
          <NamedRoute name="test2" />
        </NamedSwitch>
      </StaticRouter>
    );

    expect(Route.routes).toEqual({ test: expect.any(Route), test2: expect.any(Route) });
  });

  it('renders as expected', () => {
    const wrapper = mount(
      <StaticRouter location={'/test'} context={{}}>
        <NamedSwitch>
          <NamedRoute name="test" />
          <NamedRoute name="test2" />
        </NamedSwitch>
      </StaticRouter>
    );

    const routesRendered = wrapper.find('Route');
    expect(routesRendered.length).toBe(1);
    expect(routesRendered.prop('path')).toEqual('/test');
  });
});
