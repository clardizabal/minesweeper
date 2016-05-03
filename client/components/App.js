// var miniBoard = [[0, 0, 9], [9, 0, 9], [9, 0, 0]];

var board;
var n = 9;
var numberOfMines = 10;

var generateRandomIndices = function() {
  var randomRow = Math.floor(Math.random() * n);
  var randomCol = Math.floor(Math.random() * n);
  if (board[randomRow][randomCol]) {
    generateRandomIndices();
  } else {
    board[randomRow][randomCol] = 9;
  }
};

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

var countAdjacentMines = function(board, row, col) {
  // console.log('row: '+row+' col: '+col+' '+board[row][col]);
  var count = 0;
  //check row above and below
  for (var i = -1; i <= 1; i++) {
    if (row - 1 >= 0 && board[row - 1][col + i] === 9) {
      count++;
    }
    if (row + 1 < n && board[row + 1][col + i] === 9) {
      count++;
    }
  }
  //check left and right
  if (col - 1 >= 0 && board[row][col - 1] === 9) {
    count++;
  }
  if (board[row][col + 1] === 9) {
    count++;
  }
  return count;
};

var setDigits = function() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (board[i][j] !== 9) {
        board[i][j] = countAdjacentMines(board, i, j);
      }
    }
  }
};

board = makeEmptyMatrix(n);
// add 10 mines for a 9 x 9 board
for (var i = 0; i < numberOfMines; i++) {
  // generate 10 random places.
  generateRandomIndices();
}
setDigits();

var App = () => (
  <Board data={board}/>
);

ReactDOM.render(<App />, document.getElementById('app'));