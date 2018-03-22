// @flow

import * as React from 'react';
import { Route, type RouteProps } from 'react-router-dom';

type Props = {
  name: string,
  path?: string
};

type CombinedProps = Props & RouteProps;

export default class NamedRoute extends React.Component<CombinedProps> {
  path: string;

  static namedRoutes: { [key: string]: string } = {};

  static pathTo(name: string, params: Object = {}, search?: string, hash?: string) {
    const path = NamedRoute.namedRoutes[name];
    if (!path) throw new Error(`Undefined named route ${name}`);

    let fullPath = path;
    Object.keys(params).forEach(key => {
      if (path.indexOf(`:${key}`) === -1) throw new Error(`Undefined param ${key} for named route ${name}`);
      fullPath = fullPath.replace(`:${key}`, params[key]);
    });

    if (search) fullPath += `?${search}`;
    if (hash) fullPath += `#${hash}`;

    return fullPath;
  }

  static renderStatic(props: CombinedProps) {
    const { name, path, ...rest } = props;

    const pathOrName = path || name;
    NamedRoute.namedRoutes[name] = pathOrName;

    return <Route path={pathOrName} {...rest} />;
  }

  render() {
    return NamedRoute.renderStatic(this.props);
  }
}
