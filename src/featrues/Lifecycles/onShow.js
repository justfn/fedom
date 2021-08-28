/* ** 使用缓存时 
*/

import onHashChange from "../../router/onHashChange.js";
import { getActiveComponentFdNodes, } from "../../router/router.js";
import {
  on_show_fns, 
} from "../Component/renderCpnt.js";
import {
  isFunctionValue, 
  isArrayValue, 
} from "../../utils/judge.js";







onHashChange((evt, option)=>{
  if (option.init) { return ; }
  if (!['cache'].includes(option.type)) { return ; }
  
  let list = getActiveComponentFdNodes(option.newPathParams.path);
  list.forEach(fNd=>{
    componentShowRun(fNd); 
  })
})


export function componentShowRun(fdNode, showArgs){
  if ( fdNode.context && fdNode.context.onShow && isFunctionValue(fdNode.context.onShow) ) {
    fdNode.context.onShow(showArgs);
  }
  if ( fdNode.context && fdNode.context[on_show_fns] && isArrayValue(fdNode.context[on_show_fns]) ) {
    fdNode.context[on_show_fns].forEach((callback)=>{
      callback(showArgs);
    })
    
    return ;
  }
  
} 


export default function onShow(context, callback){
  if ( !isFunctionValue(callback) ) { return console.error('#fd onShow callback error'); }
  if ( !isArrayValue(context[on_show_fns]) ) { return console.error('#fd onShow error'); }
  
  context[on_show_fns].push((showArgs)=>{
    callback(showArgs);
  })
} 

