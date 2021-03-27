

export default function (props, context){
  
  context.onMounted(({ root, })=>{
    // console.log( '# cpta', root, props); 
  })
  
  return (
    <div class="component_CptA">
      <h1> 组件CptA </h1>
      <h2> { props.name } </h2>
    </div>
  )
}


