import { useVary, } from "../../../../libs/index.js";

import PageA from "../PageA/PageA.js";

import Board from "./Board.js";
import Board0 from "./Board0.js";
import CptA from "./CptA.js";
import "./tic_tac_toe.less";


import trackMouse from "../../../libs/trackMouse.js";
const mousePosition = trackMouse(document.body);


export default function(props, context, router){
  const scope_state = {
    xIsNext: true,
    stepNumber: 0,
    history: [ 
      Array(9).fill(null),
    ],
  }
  const Vary_state = {
    square: scope_state.history[0].map((itm,idx)=>{
      return useVary(null);
    }), 
    status: useVary(''), 
    moves: useVary(scope_state.history, (list)=>{
      return list.map((step, move) => {
        const desc = move ? `Go to move # ${move}` : 'Go to game start';
        let click = (evt)=>{
          scope_state.stepNumber = move;
          statusUpadte(Vary_state);
          
          list[move].forEach((itm,idx)=>{
            Vary_state.square[idx].set(()=>{
              return itm;
            })
          })
        }
        return (
          <h3 class="d02" onClick={click}>{desc}</h3>
        );
      });;
    }),
    varyTxt: useVary('hello'),
    tag: useVary('section'),
    cpt: useVary(Board),
  };
  function statusUpadte(st){
    const winner = calculateWinner(st.square);
    if (winner) { 
      st.status.set(()=>{ 
        return "Winner: " + winner; 
      });
      console.log(`winner is ${winner}`);
      return ;
    } 
    
    st.status.set(()=>{ return "Next player: " + (scope_state.xIsNext ? "X" : "O") })
  } 
  let refs = {
    gameBoardRef: null, 
    boardCpt: null, 
  }; 
  let gameBoardRef = null; 
  
  Vary_state.moves.mounted((...args)=>{
    // console.log(args);
  })
  context.mounted( ({ root, })=>{
    // root.style.background = 'blue';
    console.log( '#==== ref',  root, refs );
    console.log('ref', gameBoardRef );
  })
  
  
  let game_run_next = (i)=>{
    statusUpadte(Vary_state);
    if (calculateWinner(Vary_state.square)) { return ; }
    
    scope_state.xIsNext = !scope_state.xIsNext;
    Vary_state.square[i].set( (val)=>{
      return scope_state.xIsNext ? "X" : "O";
    }) 
    .then((nexVal)=>{
      scope_state.history.push(Vary_state.square.map((itm,idx)=>{
        return itm.value
      }))
    })
    Vary_state.moves.set((list)=>{
      return scope_state.history;
    })
  }
  
  let num = 0;
  let tags = ['div', 'span', 'acticle']
  let cpts = [ Board0, CptA, Board ]
  let changeTest = ()=>{
    Vary_state.tag.value = tags[num];
    Vary_state.cpt.value = cpts[num];
    num++; 
    
    Vary_state.varyTxt.value = 'world'; 
  }
  Vary_state.varyTxt.watch( (  pV, nV )=>{
    console.log( pV, nV);
  })
  return (
    <PageA>
      <Vary_state.tag class="component_Game" >
        
        { Vary_state.varyTxt  }
        
      
        <div class="b02 game-board" ref={ el=>gameBoardRef=el }>
          { /* 
          */ } 
          <Vary_state.cpt class="c0011" ref={ el=>refs.boardCpt=el } squares={Vary_state.square} onClick={game_run_next}  />        
            
          { /* */ } 
        </div>
        
        <div class="b03 game-info" >
        
          <div class="c01"> { Vary_state.status } </div>
          
          <ol class="c02"> { Vary_state.moves } </ol>
          
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
        
        <div>
            <button onClick={changeTest}> 测试 </button>
        </div>
      </Vary_state.tag>
    </PageA>
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





