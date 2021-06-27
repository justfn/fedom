import "./TicTacToe.less";
import decoratorOfLayoutA from "../../../parts/LayoutA/decorator.js";

const {
  Component,
  VaryValue,
} = window.$fd;

function Square(props, context ){
  return (
    <button className="component_Square" onClick={props.onClick} >
      { props.text }
    </button>
  );
} 

function Board(props, context){
  function renderSquare(i){
    return (
      <Square 
        text={props.squares[i]} 
        onClick={()=>{ props.onClick(i)}} 
      />
    );
  } 
  return (
    <div className={['component_Board', props.className]}>
      <div className="board-row" ref="bdRowRef">
        { renderSquare(0) }
        { renderSquare(1) }
        { renderSquare(2) }
      </div>
      <div className="board-row">
        { renderSquare(3) }
        { renderSquare(4) }
        { renderSquare(5) }
      </div>
      <div className="board-row">
        { renderSquare(6) }
        { renderSquare(7) }
        { renderSquare(8) }
      </div>
    </div>
  )
}

@decoratorOfLayoutA 
export default class Child extends Component {
  constructor(...args){
    super(...args)
  }
  xIsNext = true
  stepNumber =  0
  history = [ Array(9).fill(null), ]
  status = VaryValue('');
  moves = VaryValue(this.history, (list)=>{
    return list.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start';
      let click = (evt)=>{
        this.stepNumber = move;
        this.statusUpadte();
        
        list[move].forEach((itm,idx)=>{
          this.squareList[idx].set(()=>{
            return itm;
          })
        })
      }
      return (
        <h3 className="d02" onClick={click}>{desc}</h3>
      );
    });;
  })
  squareList = this.history[0].map((itm,idx)=>{
    return VaryValue(null);
  })
  
  handleClick = (i)=>{
    this.statusUpadte();
    if (this.calculateWinner( this.squareList )) { return ; }
    
    this.xIsNext = !this.xIsNext;
    this.squareList[i].set( (val)=>{
      return this.xIsNext ? "X" : "O";
    }) 
    .then((nexVal)=>{
      this.history.push(this.squareList.map((itm,idx)=>{
        return itm.$$
      }))
    })
    this.moves.set((list)=>{
      return this.history;
    })

  }
  statusUpadte = ()=>{
    const winner = this.calculateWinner( this.squareList );
    if (winner) { 
      this.status.set(()=>{ 
        return "Winner: " + winner; 
      });
      return ;
    } 
    this.status.set(()=>{ return "Next player: " + (this.xIsNext ? "X" : "O") })
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
        squares[a].$$ 
        && squares[a].$$ === squares[b].$$ 
        && squares[a].$$ === squares[c].$$
      ) { return squares[a].$$; }
    }
    return null;
  }
  
  render(){
    return (
      <section className={["app_TicTacToe"]}>
        <section className="component_Game" >
          <div className="game-board" >
            <Board className="c0011" 
              squares={this.squareList} 
              onClick={this.handleClick} 
            />        
          </div>
          <div className="game-info" >
            <div > { this.status } </div>
            <ol > { this.moves } </ol>
          </div>
        </section>
      </section>
    );
  }
}


