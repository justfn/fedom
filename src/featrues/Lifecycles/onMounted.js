/* ** 组件渲染后 
todo 
*/
import {
  on_mounted_fns, 
} from "../Component/renderCpnt.js";
import {
  isFunctionValue, 
  isArrayValue, 
} from "../../utils/judge.js";

export default function onMounted(context, callback){
  if ( !isFunctionValue(callback) ) { return console.error('#fd onMounted callback error'); }
  if ( !isArrayValue(context[on_mounted_fns]) ) { return console.error('#fd onMounted error'); }
  
  context[on_mounted_fns].push((...args)=>{
    callback(...args);
  })
} 
export function doCpntMounted(context, ...mountArgs){
  if ( context && context.onMounted && isFunctionValue(context.onMounted) ) {
    context.onMounted(...mountArgs);
  }
  if ( context && context[on_mounted_fns] && isArrayValue(context[on_mounted_fns]) ) {
    context[on_mounted_fns].forEach((callback)=>{
      callback(...mountArgs);
    })
    
    return ;
  }

  // console.log('to_do: ', ;
} 



