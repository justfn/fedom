import Square from "./Square.js";


export default function (props, context){
  
  context.mounted(({ root, refs })=>{
    // console.log( '# Board', root, refs);
    
  })
  
  function renderSquare(i){
    return <Square value={props.squares[i]} onClick={()=>{ props.onClick(i)}} />;
  } 
  return (
    <div class={['component_Board', props.class]}>
      aaa 
      <div class="board-row" ref="bdRowRef">
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