var Board = (props) => (
  <div>
    {props.data.map(x =>
      <div>{x}</div>)}
  </div>
);

window.Board = Board;