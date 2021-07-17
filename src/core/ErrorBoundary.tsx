import React from 'react';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<any, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>АРМ сломалса :(</h1>;
    }

    return children;
  }
}
