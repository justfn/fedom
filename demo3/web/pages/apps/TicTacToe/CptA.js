import Square from "./Square.js";


export default function (props, context){
  
  context.mounted(({ root, })=>{
    // console.log( '# cpta', root, props); 
  })
  
  return (
    <div class="component_CptA">
      <h1> { props.name } </h1>
      <div> bbbbb </div>
    </div>
  )
}