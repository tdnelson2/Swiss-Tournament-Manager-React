import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames/bind';

const styles = {
  root: {
    justifyContent: 'start',
    width: '100%',
  },
  label: {
    display: 'block',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  toggled: {
    '&:hover': {
      backgroundColor: 'rgb(157, 0, 56)',
    },
  },
}

function Player(props) {
  const { classes, sideBySide, player, onClick, index, onCollisionInfo } = props;
  const cx = classNames.bind(classes);
  const name = player.name;
  const wins = player.wins;
  const loses = player.total - props.player.wins;
  return (
    <Chip
      avatar={<Avatar>{`${wins}-${loses}`}</Avatar>}
      label={name}
      clickable
      onClick={onClick}
      {...(player.collision > -1 ? { onDelete: onCollisionInfo } : {}) }
      deleteIcon={ <InfoIcon aria-label="Info"/> }
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      color={player.isWinner ? 'secondary' : 'default'}
      className={cx({
        'paired': sideBySide,
        'toggled': player.isWinner,
      })}
    />
  );
}

export default withStyles(styles)(Player);
