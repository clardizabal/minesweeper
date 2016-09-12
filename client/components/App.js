const n = 10;
const numberOfMines = 10;

const generateRandomIndices = () => {
  let randomRow = Math.floor(Math.random() * n);
  let randomCol = Math.floor(Math.random() * n);
  if (board[randomRow][randomCol]) {
    generateRandomIndices();
  } else {
    board[randomRow][randomCol] = 9;
  }
};

const makeEmptyMatrix = (n) => {
  return _(_.range(n)).map(() => {
    return _(_.range(n)).map(() => 0);
  });
};

const countAdjacentMines = (board, row, col) => {
  let count = 0;
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

const setDigits = () => {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (board[i][j] !== 9) {
        board[i][j] = countAdjacentMines(board, i, j);
      }
    }
  }
};

const board = makeEmptyMatrix(n);
// add 10 mines for a 10 x 10 board
for (var i = 0; i < numberOfMines; i++) {
  // generate 10 random places.
  generateRandomIndices();
}
setDigits();

const title = 'M i n e s w e e p e r'

const Header = () => (
  <div id='header'>
    <div id='title'>{title}</div>
  </div>
);

const Footer = () => (
  <footer>
    <div>
      10 x 10, 50px by 50px squares. Click on a square and watch it transistion into another color. Built with&nbsp;
      <a href="https://facebook.github.io/react/">React.js</a>
    </div>
  </footer>
);

const App = () => (
  <div>
    <Header/>
    <Board data={board}/>
    <Footer/>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));