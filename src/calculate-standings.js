function calculateStandings(players) {
  players = players.slice();
  players.sort((a,b) => {
    if (a.wins < b.wins) return 1;
    else if (a.wins > b.wins) return -1;
    else return 0;
  });
  return players;
}

export default calculateStandings;
