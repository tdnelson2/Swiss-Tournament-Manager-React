import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import Player from './Player';


const styles = {
  player: {
    margin: '5px 0',
    width: '100%',
  },
  paired: {
    width: 'calc(50% - 12px)',
    margin: '10px 0',
    '&:nth-of-type(odd)': {
      marginRight: '4px',
      marginLeft: '8px',
    },
    '&:nth-of-type(even)': {
      marginLeft: '4px',
      marginRight: '8px',
    },
  }
}


class PlayerListItem extends Component {
  render() {
    const { classes, sideBySide, index, player, onPlayerClick, onCollisionInfo } = this.props;
    const cx = classNames.bind(classes);

    return(
      <li
        className={cx('player', { 'paired': sideBySide })}
      >
        <Player
          player={player}
          onClick={onPlayerClick}
          onCollisionInfo={onCollisionInfo}
          sideBySide={sideBySide}
          isRight={index % 2 === 1}
          index={index}
        />
      </li>
    );
  }
}

export default withStyles(styles)(PlayerListItem);
