import React, { Component } from 'react';
import { shuffle } from 'lodash';
import AddPlayersForm from './Add-Players-Form';
import PlayerList from './Player-List';
import Header from './Header';
import Button from '@material-ui/core/Button';
import PairingInfoAlert from './PairingInfoAlert';
import PlayerCollisionAlert from './PlayerCollisionAlert';
import Code from './Code';
import { withStyles } from '@material-ui/core/styles';
import calculateStandings from './calculate-standings';
import calculatePairUp from './calculate-pair-up';

const styles = {
  '@global': {
    '*': {
      fontFamily: '"Roboto", sans-serif',
    }
  },
  container: {
    margin: '10px',
    textAlign: 'center'
  },
  innerContainer: {
    width: '100%',
    margin: 'auto'
  },
  '@media (min-width: 600px)': {
    innerContainer: {
      width: '80%',
    },
  },
  '@media (min-width: 800px)': {
    innerContainer: {
      width: '60%',
    },
  },
  '@media (min-width: 1000px)': {
    innerContainer: {
      width: '40%',
    },
  },
}

const STAGES = {
    None: 'None',
    AddingPlayers: 'AddingPlayers',
    PairingPlayers: 'PairingPlayers',
    GameOver: 'GameOver',
}

const ALERTS = {
  none: 'none',
  pairingInstructions: 'pairingInstructions',
  collisionInfoRequsted: 'collisionInfoRequsted'
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.defaultState();

		this.onAddPlayer = this.onAddPlayer.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
		this.onPairUp = this.onPairUp.bind(this);
		this.onOptions = this.onOptions.bind(this);
    this.canPairUpAddedPlayers = this.canPairUpAddedPlayers.bind(this);
    this.canGoToNextRound = this.canGoToNextRound.bind(this);
    this.onPlayerClick = this.onPlayerClick.bind(this);
    this.onCollisionInfo = this.onCollisionInfo.bind(this);
    this.onNextRound = this.onNextRound.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  defaultState() {
    return {
      inputText: '',
			currentID: 0,
      players: [],
      matchHistory: [],
      stage: STAGES.AddingPlayers,
      winnersChosen: 0,
      gameOver: false,
      alert: ALERTS.none,
      collisionID: -1,
    };
  }

  onShowPairingInstructions() {
    this.setState({alert:ALERTS.pairingInstructions});
  }

  onOptions() {
    console.log('onOptions clicked');
  }

  onAddPlayer() {
		if (this.state.inputText === '') return;
		this.setState({
			players : [
				...this.state.players,
        this.buildPlayer({
          name: this.state.inputText,
          id: this.state.currentID,
        })],
			currentID: this.state.currentID + 1,
			inputText: '',
		});
  }

  buildPlayer(player, isWinner, isGameOver=false) {
    return {
      name: player.name,
      id: player.id,
      wins: player.wins || 0,
      total: player.total || 0,
      isWinner: (isWinner === undefined ? (player.isWinner || false) : isWinner),
      collision: (isGameOver ? -1 : (player.collision || -1)),
    };
  }

  handleInputTextChange(e) {
    this.setState({inputText: e.target.value});
  }

  handleInitialPairUp() {
    console.log(this.state.players);
    return [shuffle(this.state.players), false];
  }

  handleNextPairUp() {
    let players = calculateStandings(this.state.players);
    const isGameOver = players[0].wins > players[1].wins;
    if (!isGameOver) {
      players = calculatePairUp(players, this.state.matchHistory);
    }
    return [players, isGameOver];
  }

  onPairUp() {
    if (!this.canPairUpAddedPlayers()) return;
    const [players, isGameOver] = this.state.stage === STAGES.AddingPlayers
      ? this.handleInitialPairUp()
      : this.handleNextPairUp();

    // Rebuild each player so each player object in
    // the array is completely new.
    const rebuiltPlayers = players.map(p => this.buildPlayer(p, false, isGameOver));
    this.setState({
      stage: isGameOver ? STAGES.GameOver : STAGES.PairingPlayers,
      players: rebuiltPlayers,
      winnersChosen: 0,
    });
  }

  canPairUpAddedPlayers() {
    if (this.state.currentID === 0) return false;
    return this.state.currentID % 2 === 0;
  }

	canGoToNextRound() {
    return this.state.winnersChosen === this.state.players.length/2;
	}

  onNextRound() {
    if (!this.canGoToNextRound()) return;
    this.onPairUp();
  }

  onCollisionInfo(e, index) {
    this.setState({
      alert: ALERTS.collisionInfoRequsted,
      collisionID: index,
    });
  }

  onPlayerClick(e, index) {
    if (this.state.stage !== STAGES.PairingPlayers) return;
    let winnersChosen = this.state.winnersChosen;
    const [matchHistory, players] = [this.state.matchHistory.slice(), this.state.players.slice()];
    const [clicked, other] = this.matchedPair(index);
    const [clickedWinner, otherWinner] = [`${clicked.player.id},${other.player.id}`, `${other.player.id},${clicked.player.id}`];
    if (!clicked.player.isWinner && !other.player.isWinner) {

      // Both players in the pair have not been clicked... TOGGLE ON.
      clicked.player.wins += 1;
      clicked.player.total += 1;
      other.player.total += 1;
      clicked.player.isWinner = true;
      other.player.isWinner = false;
      matchHistory.push(clickedWinner);
      winnersChosen++;
    } else if (clicked.player.isWinner) {

      // The clicked player has already been chosen
      // as the winner... TOGGLE OFF.
      clicked.player.wins -= 1;
      clicked.player.total -= 1;
      other.player.total -= 1;
      clicked.player.isWinner = false;
      const i = matchHistory.indexOf(clickedWinner);
      if (i !== -1) matchHistory.splice(i,1);
      winnersChosen--;
    } else if (!clicked.player.isWinner && other.player.isWinner) {

      // The other player was chosen as winner...
      // TOGGLE OFF the other player and TOGGLE ON the clicked player.
      clicked.player.wins += 1;
      other.player.wins -= 1;
      clicked.player.isWinner = true;
      other.player.isWinner = false;
      const i = matchHistory.indexOf(otherWinner);
      if (i !== -1) matchHistory.splice(i,1);
      matchHistory.push(clickedWinner);
    }

    const [updatedPlayers, firstIndex] = clicked.index < other.index
      ? [[clicked.player, other.player], clicked.index]
      : [[other.player, clicked.player], other.index];

    this.setState({
      players: [
        ...players.slice(0, firstIndex),
        ...updatedPlayers,
        ...players.slice(firstIndex+2, players.length),
      ],
      matchHistory,
      winnersChosen,
    });
  }

  matchedPair(index) {
    const players = this.state.players;

    const clicked = {
      index: index,
      player: this.buildPlayer(players[index])
    };

    const otherIndex = index % 2 === 0 ? index+1 : index-1;
    const other = {
      index: otherIndex,
      player: this.buildPlayer(players[otherIndex])
    };

    return [
      clicked,
      other,
    ];
  }

  playAgain() {
    const players = [];
    this.state.players.forEach(player => {
      [player.wins, player.total] = [0, 0]
      players.push(this.buildPlayer(player, false, true))
    });

    const shuffledPlayers = shuffle(players)

    this.setState({
      players: shuffledPlayers,
      matchHistory: [],
      stage: STAGES.PairingPlayers,
      winnersChosen: 0,
      gameOver: false,
      alert: ALERTS.none,
      collisionID: -1,
    })
  }

  newGame() {
    this.setState(this.defaultState());
  }

  renderStage() {
    if (this.state.stage === STAGES.AddingPlayers) {
      return (
            <AddPlayersForm
              inputText={this.state.inputText}
              onInputTextChange={this.handleInputTextChange}
              onAddPlayer={this.onAddPlayer}
              onPairUp={this.onPairUp}
              onInfoBtnClick={() => this.setState({alert: ALERTS.pairingInstructions})}
              canPairUp={this.canPairUpAddedPlayers}
              onPlayerClick={this.onPlayerClick}
              playerCount={this.state.players.length}
            />
      );
    } else if (this.state.stage === STAGES.PairingPlayers) {
      return (
          <>
            <h4>Pairings</h4>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onNextRound}
              disabled={!this.canGoToNextRound()}
            >
              {'Next Round'}
            </Button>
          </>
      );
    } else if (this.state.stage === STAGES.GameOver) {
      return (
        <>
          <h4>
            {'Winner is '}
            <Code>{this.state.players[0].name}</Code>
          </h4>
          <Button
            color="primary"
            onClick={this.playAgain}
            style={{marginRight: '10px'}}
          >
            {'Play Again'}
          </Button>
          <Button
            color="primary"
            onClick={this.newGame}
          >
            {'New Game'}
          </Button>
        </>
      );
    }
  }

  renderAlert() {
    const { alert } = this.state;
    if (alert === ALERTS.none) return '';
    if (alert === ALERTS.pairingInstructions) {
      return (
        <PairingInfoAlert
          onClose={() => this.setState({ alert: ALERTS.none })}
        />
      );
    } else if (alert === ALERTS.collisionInfoRequsted) {
      const { collisionID } = this.state;
      const [clicked, other] = this.matchedPair(collisionID);
      const collision = this.state.players
        .find(p => p.id === clicked.player.collision);
      return (
        <PlayerCollisionAlert
          clickedPlayer={clicked.player.name}
          otherPlayer={other.player.name}
          collisionPlayer={collision.name}
          onClose={() => this.setState(
            {
              alert: ALERTS.none,
              collisionID: -1
            })}
        />
      );
    }
  }

  render() {

    const { classes } = this.props;
    const isPairing = this.state.stage === STAGES.PairingPlayers;
    const isAdding = this.state.stage === STAGES.AddingPlayers;
    return (
      <div className={classes.container}>
        {this.renderAlert()}
        <div className={classes.innerContainer}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <Header
            text={this.props.tournamentName}
            onOptions={this.onOptions}
          />
          <main>
            <section>
              {this.renderStage()}
              <PlayerList
                players={this.state.players}
                sideBySide={this.state.stage === STAGES.PairingPlayers}
                onPlayerClick={this.onPlayerClick}
                onCollisionInfo={this.onCollisionInfo}
              />
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
