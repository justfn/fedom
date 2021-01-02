import { useVary, } from "../libs/index.js";

import Board from "./Board.js";
import Board0 from "./Board0.js";


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
      // <li class="a006" key="move" > </li>
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
    root: null, 
  }; 
  
  // setTimeout(()=>{
  //   VaryTag.value = 'div'
  // },1000)
  
  // setTimeout(()=>{
  //   VaryBoard.value = Board0;
  // },1000)
  
  setTimeout(()=>{
    // VaryBoard.value = Board0;
    varyTxt.value = 'world'; 
  },1000)
  moves.mounted((...args)=>{
    // console.log(args);
  })
  context.mounted( ({ root, refs })=>{
    root.style.background = 'blue'
    // console.log( '#==== ref',  root, refs );
  })
  
  setTimeout(()=>{
    // console.log( refs.root );
  },1000)
  
  
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
    <VaryTag class="a01 game" >
      
      { varyTxt  }
      
    
      <div class="b02 game-board" ref="gameBoardRef">
        { /* 
        */ } 
        <VaryBoard class="c001111111111" squares={state.square} onClick={click1} ref="BoardRef" />        
          
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





