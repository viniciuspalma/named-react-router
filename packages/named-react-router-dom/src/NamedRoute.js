// @flow

import * as React from 'react';
import { Route as BrowserRoute, type RouteProps } from 'react-router-dom';

import Route from './Route';

type Props = {
  name: string,
  path?: string
};

type CombinedProps = Props & RouteProps;

export default class NamedRoute extends React.Component<CombinedProps> {
  path: string;

  static pathTo(name: string, params?: Object, search?: string, hash?: string) {
    return Route.get(name, params, search, hash);
  }

  static render(props: CombinedProps) {
    const { name, ...options } = props;
    const route = new Route(name, options);

    return <BrowserRoute {...route.options} path={route.path} />;
  }

  render() {
    return NamedRoute.render(this.props);
  }
}
