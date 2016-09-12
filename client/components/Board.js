const colors = ['aliceblue', 'blue', 'red', 'green', 'purple', 'maroon', 'cyan', 'black', 'magenta', 'gray'];
const title = 'C o l o r s';
const size = 10;

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleLight = this.toggleLight.bind(this);
  }

  toggleLight() {
    this.props.toggleLights(this.props.x, this.props.y, this.props.index);
  }

  render() {
    /* Inline dynamic style for Square and Text */
    const squareStyle = {
      background: this.props.reveal[this.props.x][this.props.y] ? colors[this.props.index] : 'dimgray',
    }
    const textStyle = {
      color: (colors[this.props.index] === 'yellow' ||
        colors[this.props.index] === 'cyan') ? 'black' : 'white',
    }

    return (
      <div className="square" style={squareStyle} onClick={this.toggleLight}>
        <div className="colorText" style={textStyle}>{colors[this.props.index]}</div>
      </div>
    );
  }
}

const TableRow = (props) => (
  <tr>
    <td>
      {props.sequence.map((index, x) =>
        <Square index={index} y={props.y} x={x} key={x} reveal={props.reveal} toggleLights={props.toggleLights}/>)}
    </td>
  </tr>
);

const makeEmptyMatrix = (n) => {
  return _.range(n).map(() => {
    return _.range(n).map(() => false);
  });
};

const revealSquare = (x, y) => {
  grid[x][y] = true;
}

const grid = makeEmptyMatrix(size);

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: grid
    }
    this.toggleLights = this.toggleLights.bind(this);
  }

  toggleLights(x, y, z) {
    if (z === 0) {
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          if (x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) {
            revealSquare(x + i, y + j);
          }
        }
      }
    } else {
      revealSquare(x, y);
    }

    this.setState({grid: grid});
  }

  render() {
    return (
      <table>
        <tbody>
        {this.props.data.map((sequence, index) =>
          <TableRow sequence={sequence} y={index} key={index} reveal={grid} toggleLights={this.toggleLights}/>)}
        </tbody>
      </table>
    );
  }
}

window.Board = Board;
