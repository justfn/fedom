/* ** 卸载前
*/
import config from "../../config/config.js";
import onHashChange from "../../router/onHashChange.js";
import { getActiveComponentFNodes, } from "../../router/router.js";
import {
  isComponentValue, 
  isFunctionValue, 
  isArrayValue, 
  isFDComponent, 
} from "../../utils/judge.js";



/* ** 方法二: ------------------------------------------------------------------
1: 动态组件切换时调用 
2: 路由切换, 渲染时收集页面级组件,切换前调用 
*/
export function removeComponentRun(fNode, unmountArgs){
  if ( fNode.context && fNode.context.onUnmount && isFunctionValue(fNode.context.onUnmount) ) {
    fNode.context.onUnmount(unmountArgs);
  }
  if ( fNode.context && fNode.context._onUnmountFns && isArrayValue(fNode.context._onUnmountFns) ) {
    fNode.context._onUnmountFns.forEach((callback)=>{
      callback(unmountArgs);
    })
    
    return ;
  }

  // console.log('to_do: ', fNode);
} 

onHashChange((evt, option)=>{
  // console.log( 'unmount ', evt, option);
  if (option.init) { return ; }
  if (!['render', 'cache'].includes(option.type)) { return ; }
  
  let list = getActiveComponentFNodes(option.oldPathParams.path);
  list.forEach(fNd=>{
    removeComponentRun(fNd); 
  })
})

window.addEventListener("beforeunload", (evt)=>{
  let list = getActiveComponentFNodes();
  console.log(' ====================================== ', list );
  list.forEach(fNd=>{
    removeComponentRun(fNd, {
      event: evt, 
    }); 
  })
  
  
})


export default function onUnmount(context, callback){
  if ( !isComponentValue(context) ) { return console.error('#fd onUnmount context error'); }
  if ( !isFunctionValue(callback) ) { return console.error('#fd onUnmount callback error'); }
  if ( !isArrayValue(context._onUnmountFns) ) { return console.error('#fd onUnmount error'); }
  
  context._onUnmountFns.push((showArgs)=>{
    callback(showArgs);
  })
}



/* ** 方法一: 监听dom变动 -------------------------------------------------------
// function observe(fNode){
//   // 非组件节点不处理 
//   if ( isFDComponent(fNode.tagName) ) { return ; }
//   // 组件防重处理 
//   if (fNode.children.length>0) { return ; } 
// 
//   setTimeout(()=>{
// 
//     // 定义监听回调 
//     let obCallback = (mutations,observer)=>{
//       mutations.forEach((mutation)=>{
//         console.log(mutation);
//         console.log( mutation.removedNodes );
//       })
//     }
//     // 定义变动观察器 
//     let mutation = new MutationObserver(obCallback);
//     console.log( fNode );
//     // 观察目标节点 
//     mutation.observe(fNode.realNode.parentNode, {
//       // characterData: false,
//       // attributes: false,
//       childList: true,
//       // subtree: false,
//       // attributeOldValue: false,
//       // characterDataOldValue: false,
//       // attributeFilter: [],
//     })
// 
//   })
// } 
*/


