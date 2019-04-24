import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import PlayerListItem from './PlayerListItem';
import FlipMove from 'react-flip-move';

const PLAYER_HEIGHT = 32;
const PLAYER_MARGIN_TOP = 20;
const DIVIDER_MARGIN_TOP = PLAYER_HEIGHT + PLAYER_MARGIN_TOP - 1;


const styles = {
  masterContainer: {
    margin: '20px auto',
    width: '50%',
  },
  pairing: {
    margin: '0px auto',
    width: '100%',
  },
  outerContainer: {
    position: 'relative',
  },
  board: {
    position: 'absolute',
    width: '100%',
  },
  divider: {
    margin: `${DIVIDER_MARGIN_TOP}px 0 0`,
  },
  playerContainer: {
    padding: 0,
    listStyle: 'outside none none',
    display: 'flex',
    flexWrap: 'wrap',
  },
}

class PlayerList extends Component {
  render() {
    const { classes, player, onPlayerClick, onCollisionInfo } = this.props;
    const cx = classNames.bind(classes);
    const players = [];
    const numOfRows = (this.props.players.length / 2) + 1;
    const cardHeight = (numOfRows - 1) * (DIVIDER_MARGIN_TOP + 1);

    this.props.players.forEach((player, i) => {
      players.push(
        <PlayerListItem
          player={player}
          key={player.id}
          sideBySide={this.props.sideBySide}
          index={i}
          onPlayerClick={((e) => onPlayerClick(e, i))}
          onCollisionInfo={((e) => onCollisionInfo(e, i))}
        />
      );
    });

    const renderDividers = () => {
      const dividers = [];
      let i = 1;
      while (i < numOfRows - 1) {
        dividers.push(
          <Divider className={classes.divider} key={i}/>
        );
        i++;
      }
      return dividers;
    }

    return(
      <div className={cx('masterContainer', {'pairing': this.props.sideBySide})}>
        <div className={classes.outerContainer}>
          <Fade
            in={this.props.sideBySide}
            timeout={{
              enter:1000,
              exit:0
            }}
            style={{
              transitionDelay: this.props.sideBySide ? '500ms' : '0ms'
            }}
          >
            <Card
              className={classes.board}
              style={{height: `${cardHeight}px`}}
            >
              {renderDividers()}
            </Card>
          </Fade>
          <FlipMove
            typeName="ul"
            className={classes.playerContainer}
          >
            {players}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerList);
