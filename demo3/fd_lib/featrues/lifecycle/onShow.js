/* ** 使用缓存时 
*/

import onHashChange from "../../router/onHashChange.js";
import { getActiveComponentFNodes, } from "../../router/router.js";







onHashChange((evt, option)=>{
  // console.log( 'onShow', evt, option);
  if (option.init) { return ; }
  if (!['cache'].includes(option.type)) { return ; }
  
  let list = getActiveComponentFNodes(option.newPathParams.path);
  list.forEach(fNd=>{
    componentShowRun(fNd); 
  })
})


export function componentShowRun(fNode, ...args){
  if ( fNode.context && fNode.context._onShowFns ) {
    fNode.context._onShowFns.forEach((callback)=>{
      callback(...args);
    })
    
    return ;
  }
  if ( fNode.context && fNode.context.onShow ) {
    fNode.context.onShow(...args);
    
    return ;
  }

  // console.log('to_do: ', fNode);
} 

