import React, { Component } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import AlertDialog from './AlertDialog';
import OrderedList from './OrderedList';
import Code from './Code';
import CollisionsExplained from './CollisionsExplained';

class PairingInfoAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moreInfo: false,
    };
  }

  render() {
    return (
      <AlertDialog
        open={true}
        handleClose={this.props.onClose}
        handleSecondary={() => this.setState({moreInfo: !this.state.moreInfo})}
        secondaryText={this.state.moreInfo ? 'Less Info' : 'More Info'}
        title="Instructions for adding players"
      >
        <OrderedList style={{marginTop: '0px'}}>
          <li>
            {'Add all players.'}
          </li>
          <li>
            {'Click '}
            <Code>{'Pair Up'}</Code>
            {'.'}
          </li>
        </OrderedList>
        <DialogContentText>
          {'A few other things to keep in mind...'}
        </DialogContentText>
        <OrderedList>
          <li>
            {'If the number of players is not divisible by '}
            <Code>{'8'}</Code>
            {' we may have to make some adjustments to avoid '}
            <Code>{'collisions'}</Code>
            {' (players playing each other more than once).'}
          </li>
          <li>
            {'If the number of players is divisible by '}
            <Code>{'8'}</Code>
            {', '}
            <Code>{'collisions'}</Code>
            {' are impossible. '}
          </li>
        </OrderedList>
        {this.renderMoreInfo()}
      </AlertDialog>
    );
  }

  renderMoreInfo() {
    if (this.state.moreInfo) return <CollisionsExplained />;
    return '';
  }
}

export default PairingInfoAlert;
