
export default function (props, context ){
  context.mounted(({ root, refs})=>{
    // console.log('# Square',  root, refs);
    
  })
  
  
  return (
    <button class="square" onClick={props.onClick} ref="squareRef">
      { props.value }
    </button>
  );
} 