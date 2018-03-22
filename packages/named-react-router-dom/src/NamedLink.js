// @flow

import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import NamedRoute from './NamedRoute';

type Props = {
  name: string,
  params?: Object,
  search?: string,
  hash?: string,
  navLink?: boolean,
  children: React.Node
};

export default class NamedLink extends React.Component<Props> {
  render() {
    const { name, params, search, hash, navLink, ...rest } = this.props;

    let path = NamedRoute.pathTo(name, params, search, hash);

    const component = navLink ? NavLink : Link;
    return React.createElement(component, { to: path, ...rest });
  }
}
