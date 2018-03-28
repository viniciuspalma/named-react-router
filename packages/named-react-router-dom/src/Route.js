// @flow

import type { RouteProps } from 'react-router-dom';

export type Options = {
  noNamespacePath?: boolean
} & RouteProps;

export default class Route {
  static routes: { [key: string]: Route } = {};

  name: string;
  path: string;
  options: Options;

  static get(name: string, params?: Object, search?: string, hash?: string): string {
    const route = Route.routes[name];
    if (!route) throw new Error(`Route ${name} does not exist`);

    return route.with(params, search, hash);
  }

  static getPrefixedValue(path: ?string): ?string {
    if (path && path[0] !== '/') return `/${path}`;
    return path;
  }

  constructor(name: string, options: Options = {}) {
    this.name = name;
    this.options = options;
    this.path = this.getPath();

    Route.routes[name] = this;
  }

  getPath(): string {
    let path = '';

    const split = this.name.split('.');
    const current = split.pop();

    if (!this.options.noNamespacePath) {
      split.forEach(namespace => {
        const namespaceRoute = Route.routes[namespace];

        if (!namespaceRoute) throw new Error(`Undefined route namespace ${namespace}`);
        path += namespaceRoute.path;
      });
    }

    path += Route.getPrefixedValue(this.options.path) || `/${current}`;

    return path;
  }

  with(params: ?Object, search: ?string, hash: ?string): string {
    let path = this.withParams(params);
    if (search) path += `?${search}`;
    if (hash) path += `#${hash}`;

    return path;
  }

  withParams(params: ?Object): string {
    if (!params) return this.path;

    let path = this.path;
    Object.keys(params).forEach(key => {
      if (path.indexOf(`:${key}`) === -1) throw new Error(`Undefined param ${key} for named route ${this.name}`);

      // $FlowFixMe
      const value = params[key];
      path = path.replace(`:${key}`, value);
    });

    return path;
  }
}
