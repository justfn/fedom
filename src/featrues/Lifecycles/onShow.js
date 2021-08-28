/* ** 使用缓存时 
*/

import onHashChange from "../../router/onHashChange.js";
import { getActiveComponentFdNodes, } from "../../router/router.js";
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
  if ( fdNode.context && fdNode.context._onShowFns && isArrayValue(fdNode.context._onShowFns) ) {
    fdNode.context._onShowFns.forEach((callback)=>{
      callback(showArgs);
    })
    
    return ;
  }
  
} 


export default function onShow(context, callback){
  if ( !isFunctionValue(callback) ) { return console.error('#fd onShow callback error'); }
  if ( !isArrayValue(context._onShowFns) ) { return console.error('#fd onShow error'); }
  
  context._onShowFns.push((showArgs)=>{
    callback(showArgs);
  })
} 

