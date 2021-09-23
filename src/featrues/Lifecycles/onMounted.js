/* ** 组件渲染后 
todo 
*/
import {
  on_mounted_fns, 
} from "../Component/Component.js";
import {
  isFunctionValue, 
  isArrayValue, 
} from "../../utils/judge.js";

// 执行组件渲染完毕对应绑定的事件 
export function runCpntMounted(context, ...mountArgs){
  if (!context) { return ; }
  
  if ( isFunctionValue(context.onMounted) ) {
    context.onMounted(...mountArgs);
  }
  if ( isArrayValue(context[on_mounted_fns]) ) {
    context[on_mounted_fns].forEach((callback)=>{
      callback(...mountArgs);
    })
    
    return ;
  }

  // console.log('to_do: ', ;
} 

// 监听组件渲染完毕事件
export default function onMounted(context, callback){
  if ( !isFunctionValue(callback) ) { return console.error('#fd onMounted callback error'); }
  if ( !isArrayValue(context[on_mounted_fns]) ) { return console.error('#fd onMounted error'); }
  
  context[on_mounted_fns].push((...args)=>{
    callback(...args);
  })
} 



