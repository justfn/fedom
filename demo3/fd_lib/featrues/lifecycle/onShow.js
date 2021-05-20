/* ** 使用缓存时 
*/

import onHashChange from "../../router/onHashChange.js";
import { getActiveComponentFNodes, } from "../../router/router.js";
import {
  isComponentValue, 
  isContextValue, 
  isFunctionValue, 
  isArrayValue, 
} from "../../utils/judge.js";







onHashChange((evt, option)=>{
  if (option.init) { return ; }
  if (!['cache'].includes(option.type)) { return ; }
  
  let list = getActiveComponentFNodes(option.newPathParams.path);
  list.forEach(fNd=>{
    componentShowRun(fNd); 
  })
})


export function componentShowRun(fNode, showArgs){
  if ( fNode.context && fNode.context.onShow ) {
    fNode.context.onShow(showArgs);
  }
  if ( fNode.context && fNode.context._onShowFns ) {
    fNode.context._onShowFns.forEach((callback)=>{
      callback(showArgs);
    })
    
    return ;
  }
} 


export default function onShow(context, callback){
  if (!isComponentValue(context) && !isContextValue(context)) { return console.error('#fd onShow context error'); }
  if (!isFunctionValue(callback)) { return console.error('#fd onShow callback error'); }
  if (!isArrayValue(context._onShowFns)) { return console.error('#fd onShow error'); }
  
  context._onShowFns.push((showArgs)=>{
    callback(showArgs);
  })
} 

