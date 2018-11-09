// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import InitialMoneyCashDialog from './components/InitialMoneyCashDialog';
import CashierClosedAlert from './components/CashierClosedAlert';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

type Props = {
  onSetInitialMoneyInCashier: Function,
  initialMoneyInCashier: string,
};

type State = {
  isInitialMoneyDialogOpen: boolean,
  initialMoney: string,
};

class CashierClosed extends Component<Props, State> {
  state = {
    isInitialMoneyDialogOpen: false,
    initialMoney: '',
  };

  componentDidMount() {
    const { initialMoneyInCashier } = this.props;

    this.setState({
      isInitialMoneyDialogOpen: !!initialMoneyInCashier,
      initialMoney: initialMoneyInCashier,
    });
  }

  onSetInitialMoney = (): void => {
    const { onSetInitialMoneyInCashier } = this.props;
    const { initialMoney } = this.state;

    this.setState({
      isInitialMoneyDialogOpen: false,
    }, () => onSetInitialMoneyInCashier(initialMoney));
  };

  onToggleInitialMoneyDialog = (): void => {
    const { isInitialMoneyDialogOpen } = this.state;

    this.setState({
      isInitialMoneyDialogOpen: !isInitialMoneyDialogOpen,
    });
  };

  onTypeInitialMoney = (initialMoney: string): void => {
    this.setState({
      initialMoney,
    });
  };

  renderCashierClosed = (): Object => (
    <CashierClosedAlert
      onToggleInitialMoneyDialog={this.onToggleInitialMoneyDialog}
    />
  );

  renderInitialMoneyCashDialog = (): Object => {
    const { isInitialMoneyDialogOpen, initialMoney } = this.state;

    return (
      <InitialMoneyCashDialog
        onToggleInitialMoneyDialog={this.onToggleInitialMoneyDialog}
        onTypeInitialMoney={this.onTypeInitialMoney}
        onSetInitialMoney={this.onSetInitialMoney}
        isOpen={isInitialMoneyDialogOpen}
        initialMoney={initialMoney}
      />
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderCashierClosed()}
        {this.renderInitialMoneyCashDialog()}
      </Wrapper>
    );
  }
}

export default CashierClosed;
