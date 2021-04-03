
import "./TicTacToe.less";
import PageA from "../../../Parts/PageA/PageA.js";
import Board from "./Board.js";
import Board0 from "./Board0.js";
import CptA from "./CptA.js";

const {
  VaryValue,
} = window.$fd;



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
      return VaryValue(null);
    }), 
    status: VaryValue(''), 
    moves: VaryValue(scope_state.history, (list)=>{
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
  
  return (
    <PageA class={["app_TicTacToe"]}>
      <section class="component_Game" >
      
        <div class="b02 game-board" >
          <Board class="c0011" 
            squares={Vary_state.square} 
            onClick={game_run_next} 
          />        
            
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
        
        
        
      </section>
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





