
const {
  VaryValue,
} = window.$fd;

let val1 = VaryValue('c');
export default function(props){
  // console.log( props, props.children );
  props = props ?? {};
  
  if ( props.titleVary ) {
    props.titleVary.watch((p_v,n_v)=>{
      console.log( p_v, n_v );
      if (n_v>=10) { return ; }
      
      setTimeout(function(){
        props.titleVary.$$ = ++n_v;
      },1000)
    })
    
  }
  return (
    <h1 className={['part_Header', props.className]}> 
      aaaa 
      <div>bbb</div> 
      <div>
        <span>a</span>
        <span>b</span>
        <span>{ val1 }</span>
      </div>
      { props.children }
      
      { props.titleVary }
    </h1>
  );
}


