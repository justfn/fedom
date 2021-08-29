/* ** 使用缓存时 
*/

import onHashChange from "../../router/onHashChange.js";
import { getActivedList, } from "../../router/router.js";
import { on_show_fns, } from "../Component/renderCpnt.js";
import { isFunctionValue, isArrayValue, } from "../../utils/judge.js";

// 执行组件的 show 生命周期函数 
function runCpntShow(context){
  if ( !context ) { return ; }
  if ( !context.$mounted ) { return ; }
  
  if ( isFunctionValue(context.onShow) ) {
    context.$mounted.then((elem)=>{
      context.onShow(elem);
    })
  }
  if ( isArrayValue(context[on_show_fns]) ) {
    context.$mounted.then((elem)=>{
      context[on_show_fns].forEach((callback)=>{
        callback(elem);
      })
    })
    
    return ;
  }
  
} 



// 监听hash变化 
onHashChange((evt, option)=>{
  if (option.init) { return ; }
  if (!['cache'].includes(option.type)) { return ; }
  
  let list = getActivedList(option.newPathParams.path);
  list.forEach(fNd=>{
    runCpntShow(fNd.context); 
  })
})

// 监听指定组件的 show 生命周期 
export default function onShow(context, callback){
  if ( !isFunctionValue(callback) ) { return console.error('#fd onShow callback error'); }
  if ( !isArrayValue(context[on_show_fns]) ) { return console.error('#fd onShow error'); }
  
  context[on_show_fns].push((...args)=>{
    callback(...args);
  })
} 

