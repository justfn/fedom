import { useVary, } from "../libs/index.js";

function Square(props){
  return (
    <button class="square" onClick={props.onClick}>
      { props.value }
    </button>
  );
} 
function Board(props){
  function renderSquare(i){
    return <Square value={props.squares[i]} onClick={()=>{ props.onClick(i)}} />;
  } 
  return (
    <div>
      <div class="board-row">
        { renderSquare(0) }
        { renderSquare(1) }
        { renderSquare(2) }
      </div>
      <div class="board-row">
        { renderSquare(3) }
        { renderSquare(4) }
        { renderSquare(5) }
      </div>
      <div class="board-row">
        { renderSquare(6) }
        { renderSquare(7) }
        { renderSquare(8) }
      </div>
    </div>
  )
}
export default function(props){
  const list = Array(9).fill(null);
  const state = {
    square: list.map((itm,idx)=>{
      return useVary(null);
    }), 
    xIsNext: true,
    
    stepNumber: 0,
    history: [ 
      list,
    ],
    status: useVary(''), 
  };
  function getMoves(){
    return state.history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start';
      let click = (evt)=>{
        state.stepNumber = move;
        statusUpadte(state);
    
        state.history[move].forEach((itm,idx)=>{
          state.square[idx].set(()=>{
            return itm;
          })
        })
      }
      return (
        <li key="move" >
          <button onClick={click}>{desc}</button>
        </li>
      );
    });
  } 
  const moves = useVary(getMoves());
  function statusUpadte(st){
    const winner = calculateWinner(st.square);
    if (winner) { 
      st.status.set(()=>{ 
        return "Winner: " + winner; 
      });
      console.log(`winner is ${winner}`);
      return ;
    } 
    
    st.status.set(()=>{ return "Next player: " + (state.xIsNext ? "X" : "O") })
  } 
  
  let click1 = (i)=>{
    statusUpadte(state);
    if (calculateWinner(state.square)) { return ; }
    
    state.xIsNext = !state.xIsNext;
    state.square[i].set((val)=>{
      // console.log( val );
      return state.xIsNext ? "X" : "O";
    }, ()=>{
      
      state.history.push(state.square.map((itm,idx)=>{
        return itm.value
      }))
    }) 
    moves.set((list)=>{
      // console.log(list );
      return getMoves();
    })
    // if (calculateWinner(state.square) || state.square[i].value ) { return; }
  }
  return (
    <div class="game">
      <div class="game-board">
        <Board squares={state.square} onClick={click1} />        
        { /* 
          */ } 
      </div>
      <div class="game-info">
        <div > { state.status } </div>
        <ol> { moves } </ol>
      </div>
    </div>
  )
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
      return squares[a].value;
    }
  }
  return null;
}





