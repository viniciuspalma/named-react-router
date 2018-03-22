// @flow

import * as React from 'react';
import { Redirect, type RedirectProps } from 'react-router-dom';

import NamedRoute from './NamedRoute';

type Props = RedirectProps;

export default class NamedRedirect extends React.Component<Props> {
  static renderStatic(props: Props) {
    const { name, ...rest } = props;
    return <Redirect to={NamedRoute.pathTo(name)} {...rest} />;
  }

  render() {
    return NamedRedirect.renderStatic(this.props);
  }
}
