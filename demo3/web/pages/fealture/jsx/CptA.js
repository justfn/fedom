

export default function (props, context){
  
  setTimeout(()=>{
    console.log('cpta mounted');
  })
  
  return (
    <div class="component_CptA">
      <h1> 组件CptA </h1>
      <h2> { props.name } </h2>
    </div>
  )
}


