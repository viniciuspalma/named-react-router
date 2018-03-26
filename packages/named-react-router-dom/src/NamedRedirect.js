// @flow

import * as React from 'react';
import { Redirect, type RedirectProps } from 'react-router-dom';

import NamedRoute from './NamedRoute';

type Props = RedirectProps;

export default class NamedRedirect extends React.Component<Props> {
  static render(props: Props) {
    const { name, ...rest } = props;
    return <Redirect to={NamedRoute.pathTo(name)} {...rest} />;
  }

  render() {
    return NamedRedirect.render(this.props);
  }
}
