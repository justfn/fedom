import { useVary, } from "../libs/vary/Vary.js";





function Square(props){
  return {
    tag: 'button',
    class: 'square',
    click(){ props.click(); },
    children: [
      props.value,
    ],
  };
} 
function Board(props){
  function renderSquare(i){
    return Square({
      value: props.squares[i], 
      click: ()=>{ props.click(i)},
    });
  } 
  return {
    tag: 'div',
    children: [
      {
        tag: 'div',
        class: 'board-row',
        children: [
          renderSquare(0),
          renderSquare(1),
          renderSquare(2),
        ],
      },
      {
        tag: 'div',
        class: 'board-row',
        children: [
          renderSquare(3),
          renderSquare(4),
          renderSquare(5),
        ],
      },
      {
        tag: 'div',
        class: 'board-row',
        children: [
          renderSquare(6),
          renderSquare(7),
          renderSquare(8),
        ],
      },
    ],
  };
}
export default function(query){
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
  }
  function getMoves(list){
    return list.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start';
      return {
        tag: 'li',
        key: 'move',
        children: [
          {
            tag: 'button',
            click: (evt)=>{
              state.stepNumber = move;
              statusUpadte(state);
              
              state.history[move].forEach((itm,idx)=>{
                state.square[idx].set(()=>{
                  return itm;
                })
              })
              
            },
            children: [ desc, ],
          }
        ],
      };
    });
  } 
  const moves = useVary(getMoves(state.history));
  function statusUpadte(st){
    const winner = calculateWinner(st.square);
    if (winner) { 
      st.status.set(()=>{ 
        console.log('# 001');
        return "Winner: " + winner; 
      });
      console.log('# 002');
      console.log(`winner is ${winner}`);
      return ;
    } 
    
    console.log('# 02', state.xIsNext);
    st.status.set(()=>{ return "Next player: " + (state.xIsNext ? "X" : "O") })
  } 
  
  return {
    tag: 'div',
    class: 'game',
    children: [
      {
        tag: 'div',
        class: 'game-board',
        children: [
          Board({
            squares: state.square,
            click: (i)=>{
              statusUpadte(state);
              if (calculateWinner(state.square)) { return ; }
              state.xIsNext = !state.xIsNext;
              state.square[i].set(()=>{
                return state.xIsNext ? "X" : "O";
              }) 
              // if (calculateWinner(state.square) || state.square[i].value ) { return; }
            },
          }),
        ],
      },
      {
        tag: 'div',
        class: ['game-info'],
        children: [
          {
            tag: 'div',
            children: [
              state.status,
            ],
          },
          {
            tag: 'ol',
            children: moves, 
            // children: [
            //   ...moves, // 待优化 
            // ],
          },
        ],
      },
    ],
  };
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





