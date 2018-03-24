// @flow

import * as React from 'react';
import { Switch } from 'react-router-dom';

type Props = {
  children: React.Node
};

export default class NamedSwitch extends React.Component<Props> {
  render() {
    return (
      <Switch>
        {React.Children.map(this.props.children, child => {
          const renderStatic = child.type.renderStatic;
          return renderStatic ? renderStatic(child.props, this.context) : child;
        })}
      </Switch>
    );
  }
}
