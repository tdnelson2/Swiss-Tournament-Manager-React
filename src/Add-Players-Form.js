import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormInput from './Form-Input';

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
  },
  pairUpControls: {
    display: 'flex !important',
    justifyContent: 'space-between !important',
  },
  pairupBtn: {
    marginTop: '10px !important',
  },
  tooltip: {
    padding: 0,
  },
}

function AddPlayersForm(props) {
  const { classes } = props;
  const canPairUp = props.canPairUp();

  const divider = () => {
    if (props.playerCount > 0) return <Divider />;
    return '';
  }


  return (
    <div className={classes.container}>
      <FormInput
        inputText={props.inputText}
        placeholder="Add Player"
        onInputTextChange={props.onInputTextChange}
        onTextSubmit={props.onAddPlayer}
      />
      <div className={classes.pairUpControls}>
        <IconButton
          aria-label="Info"
          className="info-btn"
          onClick={props.onInfoBtnClick}
        >
          <InfoIcon />
        </IconButton>
        <Tooltip title={
              canPairUp
                ? 'Play Matches'
                : 'Even number required'}>
          <div className={classes.tooltip}>
            <Button
              className={classes.pairupBtn}
              variant="contained"
              color="primary"
              onClick={props.onPairUp}
              disabled={!canPairUp}
            >
              {'Pair Up'}
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default withStyles(styles)(AddPlayersForm);


// function AddPlayersForm(props) {
//   const { classes } = props;
//   const canPairUp = props.canPairUp();
//
//   const divider = () => {
//     if (props.playerCount > 0) return <Divider />;
//     return '';
//   }
//
//   return (
//     <div className={classes.container}>
//       <FormInput
//         inputText={props.inputText}
//         placeholder="Add Player"
//         onInputTextChange={props.onInputTextChange}
//         onTextSubmit={props.onAddPlayer}
//       />
//       <div className={classes.pairUpControls}>
//         <IconButton aria-label="Info" className="info-btn">
//           <InfoIcon />
//         </IconButton>
//         <MuiThemeProvider
//           theme={
//             !canPairUp
//               ? {
//                   ...enabledTheme,
//                   palette: {
//                     ...enabledTheme.palette,
//                     primary: {
//                       main: grey[50],
//                       contrastText: enabledTheme.palette.getContrastText(grey[50]),
//                     },
//                   },
//                 }
//               : enabledTheme
//           }
//         >
//           <Tooltip title={canPairUp
//                             ? 'Play Matches'
//                             : 'Must have an even number of players to play'}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={props.onPairUp}
//             >
//               {'Pair Up'}
//             </Button>
//           </Tooltip>
//         </MuiThemeProvider>
//       </div>
//     </div>
//   );
// }
