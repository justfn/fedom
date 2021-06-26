
import {
  isNumberValue,
} from "../../utils/judge.js";


export default function go(num){
  if (!isNumberValue(num)) {
    console.error(`fd router go argument error: [${num}] is not a number`);
    return ;
  }
  
  window.history.go(num);
  
} 