import React, { Component } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import AlertDialog from './AlertDialog';
import Code from './Code';
import OrderedList from './OrderedList';
import CollisionsExplained from './CollisionsExplained';

class PlayerCollisionAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moreInfo: false,
    };
  }

  render() {
    const { clickedPlayer, otherPlayer, collisionPlayer, onClose } = this.props;

    const title =
      (<>
        {'Why was '}
        <Code>{clickedPlayer}</Code>
        {' paired with '}
        <Code>{otherPlayer}</Code>
        {' and not '}
        <Code>{collisionPlayer}</Code>
        {'?'}
      </>);

    const content = (
      <>
        <DialogContentText>
          <Code>{clickedPlayer}</Code>
          {' already played '}
          <Code>{collisionPlayer}</Code>
          {' in a previous round.'}
        </DialogContentText>
        <DialogContentText>
          {'We matched '}
          <Code>{clickedPlayer}</Code>
          {' to '}
          <Code>{otherPlayer}</Code>
          {' instead because...'}
        </DialogContentText>
        <OrderedList>
          <li>{'They have not played each before'}</li>
          <li>{'They have a similar win/loss record'}</li>
        </OrderedList>
      </>
    );

    return (
      <AlertDialog
        open={true}
        handleClose={onClose}
        handleSecondary={() => this.setState({moreInfo: !this.state.moreInfo})}
        secondaryText={this.state.moreInfo ? 'Less Info' : 'More Info'}
        title={title}
      >
        {content}
        {this.renderMoreInfo()}
      </AlertDialog>
    );
  }

  renderMoreInfo() {
    if (this.state.moreInfo) return <CollisionsExplained />;
    return '';
  }
}

export default PlayerCollisionAlert;
