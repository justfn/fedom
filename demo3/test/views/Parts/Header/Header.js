import { useVary, } from "../../../../libs/index.js";


let val1 = useVary('c');
export default function(props){
  
  return (
    <h1 className={['part_Header']}> 
      aaaa 
      <div>bbb</div> 
      <div>
        <span>a</span>
        <span>b</span>
        <span>{ val1 }</span>
      </div>
    </h1>
  );
}


