import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import AlertDialog from './AlertDialog';
import OrderedList from './OrderedList';
import Code from './Code';

function CollisionsExplained(props) {
  return (
    <>
      <DialogContentText>
        {'Why do '}
        <Code>{'collisions'}</Code>
        {' happen?'}
      </DialogContentText>
      <DialogContentText style={{marginTop: '14px'}}>
        {' Think about how the NCAA March Madness tournament is structured. '}
        {'It\'s an  Elimination Style Tournament so at the end of '}
        {'each round, half the remaining players are eliminated. '}
        {'The elimination on both sides of the bracket looks like this: '}
        <Code>{'32'}</Code>
        {' then '}
        <Code>{'16'}</Code>
        {' then '}
        <Code>{'8'}</Code>
        {' then '}
        <Code>{'4'}</Code>
        {' then '}
        <Code>{'2'}</Code>
        {' then '}
        <Code>{'1'}</Code>
        {'. '}
        {'However if it were to start with '}
        <Code>{'30'}</Code>
        {' players, it would be '}
        <Code>{'30'}</Code>
        {' then '}
        <Code>{'15'}</Code>
        {' then, what '}
        <Code>{'7.5'}</Code>
        {'?! Obviously that\'s not how elimination works! '}
      </DialogContentText>
      <DialogContentText style={{marginTop: '14px'}}>
        {'The same problem applies to the Swiss Style Tournament except the '}
        {'key difference between the Elimination Style Tournament and the '}
        {'Swiss Style Tournament is that in the Swiss Style Tournament '}
        {'losing never means you get eliminated from the entire tournament. '}
        {'Instead of eliminating losers at the end of each round, '}
        {'they continue on in '}
        <em>{'sub-tournaments'}</em>
        {' with players who have the exact same number of wins and losses. '}
        {'Each match decision results in the losing player '}
        {'being eliminated from that '}
        <em>{'sub-tournament'}</em>
        {' and joining a different '}
        <em>{'sub-tournament'}</em>
        {' comprised of the other players with the same number of loses. '}
        {'Meanwhile, the winning player continues on in the original '}
        <em>{'sub-tournament'}</em>
        {'.'}
      </DialogContentText>
      <DialogContentText style={{marginTop: '14px'}}>
        {'If the number of players is divisible by '}
        <Code>{'8'}</Code>
        {', each of those '}
        <em>{'sub-tournaments'}</em>
        {' is guaranteed to contain players with identical win/loss records '}
        {'which, as you\'ll see, ensures each round contains '}
        <em>{'sub-tournaments'}</em>
        {' with players who have never played each other. '}
      </DialogContentText>
      <DialogContentText style={{marginTop: '14px'}}>
        {'However if the number of players is not divisible by '}
        <Code>{'4'}</Code>
        {', some players will be forced to match up against players '}
        {'who have one greater number of wins and one less number of  '}
        {'losses. Consequently, this creates the possibility '}
        {'that players with a fewer number of wins could beat a player with '}
        {'more wins and remain within that particular '}
        <em>{'sub-tournament'}</em>
        {' while the losing player also remains in that particular '}
        <em>{'sub-tournament'}</em>
        {'. This is because while before the two players had a different '}
        {'number of wins and a different number of losses, now they have '}
        {'the same number of wins and the same number of losses. As a result '}
        {'of this lack of elimination there is a high probability of a '}
        <Code>{'collision'}</Code>
        {' — the two players who just played one another being paired up '}
        {'again in a subsequent match. This is an undesirable side effect so '}
        {'steps must be taken to check for '}
        <Code>{'collisions'}</Code>
        {' and re-pair players when '}
        <Code>{'collisions'}</Code>
        {' are detected.'}
      </DialogContentText>
    </>
  );
}

export default CollisionsExplained;
