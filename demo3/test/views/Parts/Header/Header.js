import { useVary, } from "../../../../libs/index.js";


let val1 = useVary('c');
export default function(props){
  // console.log( props, props.children );
  props = props ?? {}
  return (
    <h1 class={['part_Header', props.class]}> 
      aaaa 
      <div>bbb</div> 
      <div>
        <span>a</span>
        <span>b</span>
        <span>{ val1 }</span>
      </div>
      { props.children }
    </h1>
  );
}


