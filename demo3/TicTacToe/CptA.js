import Square from "./Square.js";


export default function (props, context){
  
  context.mounted(({ root, refs })=>{
    console.log( '# Board', root, refs);
    
  })
  
  return (
    <div class="component_CptA">
      aaa
    </div>
  )
}