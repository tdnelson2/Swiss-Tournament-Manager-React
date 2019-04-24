import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  // Based on how GitHub treats <code>
  root: {
    fontFamily: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace',
    backgroundColor: 'rgba(27,31,35,.05)',
    borderRadius: '3px',
    fontSize: '85%',
    margin: 0,
    padding: '.1em .4em',
  },
}

function Code(props) {
  const { classes, children } = props;
  return (
    <span className={classes.root}>
      {children}
    </span>
  );
}

export default withStyles(styles)(Code);
