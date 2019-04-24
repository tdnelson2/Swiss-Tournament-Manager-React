
function isDuplicateMatch(pair, matchHistory) {
  // If `matchHistory` is a `Set` it should have a key for `'has'`.
  if (matchHistory['has']) {
    if (matchHistory.has(`${pair[0]},${pair[1]}`)
    ||  matchHistory.has(`${pair[1]},${pair[2]}`)) return true;
  }

  // Otherwise `matchHistory` is an array.
  else {
    if (matchHistory.indexOf(`${pair[0]},${pair[1]}` !== -1)
    ||  matchHistory.indexOf(`${pair[1]},${pair[2]}` !== -1)) return true;
  }
  return false;
}

function calculateSwapIndex(players,
                            originIndex,
                            previousIndex,
                            smallerIndex,
                            largerIndex) {
  // The entire array has been searched.
  if (smallerIndex < 0 && largerIndex > players.length-1) return null;

  // There are no smaller indexes left.
  if (smallerIndex < 0 && largerIndex <= players.length-1) return largerIndex;

  // There are no larger indexes left.
  if (smallerIndex >= 0 && largerIndex > players.length-1) return smallerIndex;

  // If the last search was larger, go smaller this time.
  // If the last search was smaller, go larger this time.
  return originIndex - previousIndex >= 0 ? largerIndex : smallerIndex;
}

function verticalSwap(pair1Index, pair2Index, players) {
  [players[pair1Index], players[pair2Index]] =
  [players[pair2Index], players[pair1Index]];
}

function diagonalSwap(pair1Index, pair2Index, players) {
  [players[pair1Index+1], players[pair2Index]] =
  [players[pair2Index], players[pair1Index+1]];
}

function getSwapper(pair1Index,
                    pair2Index,
                    players,
                    matchHistory,
                    isFirstTry=true) {
  // Make a copy of the players since we're just testing to see
  // if swapping results in unique pairs (we can't swap for real
  // until we know which function - if any - results in 2 unique pairs).
  const playersCopy = players.slice();

  // First try swapping the first items from each pair (aka vertical swap).
  if (isFirstTry) verticalSwap(pair1Index, pair2Index, playersCopy);

  // If this is the 2nd recursion, swapping the first item
  // from each pair didn't result in 2 unique pairs.
  // The second possible swap is the first item from
  // the first pair and the second item from the second pair
  // (aka diagonal swap).
  else diagonalSwap(pair1Index, pair2Index, playersCopy);

  // Iterate through the 2 pairs and check if each is unique.
  for (let pairIndex of [pair1Index, pair2Index]) {

    // Create the pair (`pairIndex` is the index of first item
    // `pairIndex+1` is the index of the second item).
    const pair = [playersCopy[pairIndex].id, playersCopy[pairIndex+1].id];
    if (isDuplicateMatch(pair, matchHistory)) {

      // If either is not unique, and a diagonal swap has
      // not been attempted, try again with the diagonal swap.
      if (isFirstTry) return getSwapper(pair1Index,
                                        pair2Index,
                                        players,
                                        matchHistory,
                                        false);

      // If this is the second try (the diagonal swap)
      // we know no unique pair is possible
      // so we just return null.
      return null
    };
  }

  // If we get to this point, we know both pairs are unique,
  // so we simply return the function which created the unique pair.
  if (isFirstTry) return verticalSwap;
  else return diagonalSwap;
}

function uniquePairAdjuster(players,
                            originIndex,
                            matchHistory,
                            previousIndex = originIndex+1,
                            smallerIndex  = originIndex-2,
                            largerIndex   = originIndex+2) {

  // Decrement `smallerIndex` if it was checked during the last recursion.
  if (previousIndex === smallerIndex) smallerIndex -= 2;

  // Increment `largerIndex` if it was checked during the last recursion.
  else if (previousIndex === largerIndex) largerIndex += 2;

  // Get the index of a pair with the next closes win/loss record.
  const swapIndex = calculateSwapIndex(players,
                                       originIndex,
                                       previousIndex,
                                       smallerIndex,
                                       largerIndex);

  // If we run out of indexes, `swapIndex` will be `null`.
  // This means there are no possible re-pairings as
  // all indexes have already been checked in previous recurrences.
  // It's really unlikely this would happen but if it does, this check
  // will terminate the recursion and keep it from continuing forever.
  // TODO: return an error to inform the user
  // a unique pair could not be found.
  if (swapIndex === null) return;

  // Returns a function for swapping players from each pair:
  // `verticalSwap` if unique pairs is achieved by swapping the first player
  // from each pair results in unique pairs.
  // `diagonalSwap` if unique pairs is achieved by swapping the first player
  // from the first pair with the second player from the second pair.
  // If neither function can generate unique pairs, it returns `null`.
  const swapper = getSwapper(originIndex, swapIndex, players, matchHistory);

  // Check if `getSwapper` was able to return a function.
  if (swapper !== null) {

    // Perform the swap.
    swapper(originIndex, swapIndex, players);
    return;
  }

  // If no swap was found, recurse `uniquePairAdjuster`.
  return uniquePairAdjuster(players,
                            originIndex,
                            matchHistory,
                            swapIndex,
                            smallerIndex,
                            largerIndex);
}

function logPairs(players, matchHistory) {
  for (let i = 0; i < players.length - 1; i = i + 2) {
    const pair = [players[i].id,players[i+1].id];
    const isDup = isDuplicateMatch(pair, matchHistory);
    if (isDup) {
      console.log(`${pair} ${isDup ? 'has' : 'has not'} already been played`);
    }
  }
}

function calculatePairUp(players, matchHistory) {
  players = players.slice();

  // If the browser supports `Set`, convert `matchHistory`
  // to a `Set` to take advantage of its O(1) access time
  // when seaching for an item.
  if (window.Set) matchHistory = new Set(matchHistory);

  console.log('\nBefore adjustment\n');
  logPairs(players, matchHistory);

  // The items at the even `players` indexes are paired to the
  // subsequent item at the odd `players` index immediately after it.
  // However, because players are only allowed to play
  // each other once per tournament, we must adjust the way
  // `players` is sorted to ensure unique pairs.
  for (let i = 0; i < players.length - 1; i = i + 2) {

    // Check if pairing is unique.
    if (isDuplicateMatch([players[i].id, players[i+1].id], matchHistory)) {
      players[i].collision = players[i+1].id;
      players[i+1].collision = players[i].id;

      // If it's already been played, adjust the order of `players`
      // so pairings are unique.
      uniquePairAdjuster(players, i, matchHistory);
    } else {
      [players[i].collision, players[i+1].collision] = [-1, -1];
    }
  }

  console.log('\nAfter adjustment\n');
  logPairs(players, matchHistory);
  return players;
}

export default calculatePairUp;
