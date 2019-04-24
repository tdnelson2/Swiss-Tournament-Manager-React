import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    lineHeight: 1.5,
    color: 'rgba(0, 0, 0, 0.54)',
  },
}

function OrderedList(props) {
  const { children, classes, ...other } = props;
  return (
    <ol
      className={classes.root}
      {...other}
    >
      {children}
    </ol>
  )
}

export default withStyles(styles)(OrderedList);
