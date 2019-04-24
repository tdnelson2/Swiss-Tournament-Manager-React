import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  orangeFlusha: {
    zIndex: '-999',
    opacity: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(-45deg, rgb(192, 78, 140), rgb(240, 102, 100))',
  },
}

function GradiantBackground(props) {
  const { classes } = props;
  return (
    <div className={classes[props.name]}></div>
  );
}

export default withStyles(styles)(GradiantBackground);
