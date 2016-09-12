const colors = ['black', 'yellow', 'orange', 'green', 'cyan', 'blue', 'magenta', 'purple', 'brown', 'red'];
const title = 'C o l o r s';
const size = 10;

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.toggleLight = this.toggleLight.bind(this);
  }

  toggleLight() {
    this.props.toggleLights(this.props.x, this.props.y);
  }

  render() {
    /* Inline dynamic style for Square and Text */
    const squareStyle = {
      background: colors[this.props.index],
      background: 'gray',
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
      {props.sequence.map((index, y) =>
        <Square index={index} x={props.x} y={y} key={y} toggleLights={props.toggleLights}/>)}
    </td>
  </tr>
);

class Board extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {grid}
    this.toggleLights = this.toggleLights.bind(this);
  }

  toggleLights(x, y) {
    console.log(x, y);
  }

  // toggleLights(x, y) {
  //   grid[x][y] = grid[x][y] ? 0 : 1;
  //   // console.log(grid[x][y]);
  //   for (let i = -1; i <= 1; i += 2) {
  //     if (y + i < size && y + i >= 0) {
  //       grid[x][y + i] = grid[x][y + i] ? 0 : 1;
  //     }
  //     if (x + i < size && x + i >= 0) {
  //       grid[x + i][y] =  grid[x + i][y] ? 0 : 1;
  //     }
  //   }
  //   this.setState({grid});
  // }

  render() {
    return (
      <table>
        <tbody>
        {this.props.data.map((sequence, index) =>
          <TableRow sequence={sequence} x={index} key={index} toggleLights={this.toggleLights}/>)}
        </tbody>
      </table>
    );
  }
}

window.Board = Board;
