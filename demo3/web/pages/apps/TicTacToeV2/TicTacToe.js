import "./TicTacToe.less";
import PageB from "../../../parts/PageB/PageB.js";

const {
  VaryValue,
  VaryList,
} = window.$fd;


export default class TicTacToeV2 extends PageB {
  constructor(...args){
    super(...args);
    
    this.squareList$ = VaryList(
      Array(9).fill(null).map((itm, idx)=>{
        return {
          text$: VaryValue(''),
          idx: idx, 
        };
      }), 
      (itm, idx, id, lst)=>{
        return (
          <button class="component_Square" onClick={()=>this.squareClick(itm, idx)} >
            { itm.text$ }
          </button>
        );
      }
    )
  }
  
  /* -------------------------------------------------------------------- 九宫格    */
  xIsNext = true;
  squareClick = (itm, idx)=>{
    if ( this.isFinish ) { return ; }
    if ( itm.text$.$$ ) { return ; }
    
    this.xIsNext = !this.xIsNext;
    let nextVal = this.xIsNext ? "X" : "O";
    itm.text$.set(()=>{ return nextVal; })
    .then((nexVal)=>{
      this.statusUpadte();
      
      this.stepIndex ++;
      this.history$.$push( this.squareList$.$$.map((itm,idx)=>{
        return itm.text$.$$
      }) )
    })
    .then(()=>{
      if (this.history$.$$.length > this.stepIndex+1) {
        console.log(" >>>>>>>>>>>>>> ", 'slice')
        this.history$.$slice(0, this.stepIndex+1);
      }
    })
  }
  statusUpadte = ()=>{
    const winner = this.calculateWinner( this.squareList$.$$ );
    if (winner) { 
      this.isFinish = true; 
      this.status.$$ = "Winner: " + winner; 
      return winner;
    } 
    
    this.isFinish = false; 
    this.status.$$ = "Next player: " + (this.xIsNext ? "O" : "X");
    return null;
  }
  calculateWinner = (squares)=>{
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
      if (
        squares[a].text$.$$ 
        && squares[a].text$.$$ === squares[b].text$.$$ 
        && squares[a].text$.$$ === squares[c].text$.$$
      ) { return squares[a].text$.$$; }
    }
    
    return null;
  }
  /* -------------------------------------------------------------------- 状态    */
  isFinish = false;
  status = VaryValue('');
  /* -------------------------------------------------------------------- 历史记录    */
  stepIndex = 0;
  history$ = VaryList( [ Array(9).fill(''), ], (itm, idx, id, list)=>{
    // console.log(" >>>>>>>>>>>>>> ", itm, idx, id, list)
    const desc = idx ? `Go to move # ${idx}` : 'Go to game start';
    return (
      <h3 class="d02" onClick={(evt)=>this.historyGo( itm, idx )}>{desc}</h3>
    );
  })
  historyGo = ( historyItm, idx )=>{
    
    this.squareList$.$map((itm, idx)=>{
      itm.text$.$$ = historyItm[idx]
    })
    this.statusUpadte();
    
    this.stepIndex = idx; 
  }

  
  render(){
    return (
      <section class={["app_TicTacToeV2"]}>
        <section class="component_Game" >
          <div class="game-board" >
            
            <div class="board-wrap">
              { this.squareList$ }
            </div>
               
          </div>
          
          <div class="game-info" >
            <div > { this.status } </div>
            <ol > { this.history$ } </ol>
          </div>
        </section>
      </section>
    );
  }
}


