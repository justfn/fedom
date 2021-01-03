import { useVary, } from "../libs/index.js";

import Board from "./Board.js";
import Board0 from "./Board0.js";
import "./app.less";


import trackMouse from "./trackMouse.js";
const mousePosition = trackMouse(document.body);


export default function(props, context, router){
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
        <h3 class="d02" onClick={click}>{desc}</h3>
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
  let VaryTag = useVary('section');
  let VaryBoard = useVary(Board);
  let varyTxt = useVary('hello');
  let refs = {
    gameBoardRef: null, 
    boardCpt: null, 
  }; 
  let gameBoardRef = null; 
  
  moves.mounted((...args)=>{
    // console.log(args);
  })
  context.mounted( ({ root, })=>{
    // root.style.background = 'blue';
    console.log( '#==== ref',  root, refs );
    console.log('ref', gameBoardRef );
  })
  setTimeout(()=>{
    // VaryBoard.value = Board0;
    // varyTxt.value = 'world'; 
    // VaryTag.value = 'div'
  },1000)
  
  
  let game_run_next = (i)=>{
    statusUpadte(state);
    if (calculateWinner(state.square)) { return ; }
    
    state.xIsNext = !state.xIsNext;
    state.square[i].set(
      (val)=>{
        return state.xIsNext ? "X" : "O";
      }, 
      ()=>{
        state.history.push(state.square.map((itm,idx)=>{
          return itm.value
        }))
      }
    ) 
    moves.set((list)=>{
      return getMoves();
    })
    // if (calculateWinner(state.square) || state.square[i].value ) { return; }
  }
  return (
    <VaryTag class="component_Game" >
      
      { varyTxt  }
      
    
      <div class="b02 game-board" ref={ el=>gameBoardRef=el }>
        { /* 
        */ } 
        <VaryBoard class="c001111111111" ref={ el=>refs.boardCpt=el } squares={state.square} onClick={game_run_next}  />        
          
        { /* */ } 
      </div>
      
      <div class="b03 game-info" ref="gameInfoRef">
      
        <div class="c01"> { state.status } </div>
        
        <ol class="c02"> { moves } </ol>
        
        <div class="c03">
          <span class="d01" >
            eee1
            <span class="e01" />
            eee2
          </span>
          <div class="d09">123123</div>
        </div>
      </div>
      
      <div class="b04">
        <div class="c04">{ mousePosition.x }</div>
        <div class="c05">{ mousePosition.y }</div>
      </div>
    </VaryTag>
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





