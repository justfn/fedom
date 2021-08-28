/* ** 卸载前
*/
import onHashChange from "../../router/onHashChange.js";
import { getActiveComponentFdNodes, } from "../../router/router.js";
import {
  on_unmount_fns, 
} from "../Component/renderCpnt.js";
import {
  isFunctionValue, 
  isArrayValue, 
} from "../../utils/judge.js";



/* ** 方法二: ------------------------------------------------------------------
1: 动态组件切换时调用 
2: 路由切换, 渲染时收集页面级组件,切换前调用 
*/
export function removeComponentRun(fdNode, unmountArgs){
  if ( fdNode.context && fdNode.context.onUnmount && isFunctionValue(fdNode.context.onUnmount) ) {
    fdNode.context.onUnmount(unmountArgs);
  }
  if ( fdNode.context && fdNode.context[on_unmount_fns] && isArrayValue(fdNode.context[on_unmount_fns]) ) {
    fdNode.context[on_unmount_fns].forEach((callback)=>{
      callback(unmountArgs);
    })
    
    return ;
  }

  // console.log('to_do: ', fdNode);
} 

onHashChange((evt, option)=>{
  // console.log( 'unmount ', evt, option);
  if (option.init) { return ; }
  if (!['render', 'cache'].includes(option.type)) { return ; }
  
  let list = getActiveComponentFdNodes(option.oldPathParams.path);
  list.forEach(fNd=>{
    removeComponentRun(fNd); 
  })
})

window.addEventListener("beforeunload", (evt)=>{
  let list = getActiveComponentFdNodes();
  console.log(' ====================================== ', list );
  list.forEach(fNd=>{
    removeComponentRun(fNd, {
      event: evt, 
    }); 
  })
  
  
})


export default function onUnmount(context, callback){
  if ( !isFunctionValue(callback) ) { return console.error('#fd onUnmount callback error'); }
  if ( !isArrayValue(context[on_unmount_fns]) ) { return console.error('#fd onUnmount error'); }
  
  context[on_unmount_fns].push((showArgs)=>{
    callback(showArgs);
  })
}



/* ** 方法一: 监听dom变动 -------------------------------------------------------
// function observe(fdNode){
//   // 非组件节点不处理 
//   if ( isFDComponent(fdNode.tagName) ) { return ; }
//   // 组件防重处理 
//   if (fdNode.children.length>0) { return ; } 
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
//     console.log( fdNode );
//     // 观察目标节点 
//     mutation.observe(fdNode.realNode.parentNode, {
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


