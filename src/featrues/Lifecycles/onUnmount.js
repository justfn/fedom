/* ** 卸载前
*/
import onHashChange from "../../router/onHashChange.js";
import { getActivedList, } from "../../router/router.js";
import { on_unmount_fns, } from "../Component/renderCpnt.js";
import { isFunctionValue, isArrayValue, } from "../../utils/judge.js";



/* ** 执行组件卸载生命周期绑定的事件  
方法二: 
1: 动态组件切换时调用 
2: 路由切换, 渲染时收集页面级组件,切换前调用 
*/
export function runCpntRemove(context, ...args){
  if (!context) { return ; }
  
  if ( isFunctionValue(context.onUnmount) ) {
    context.onUnmount(...args);
  }
  if ( isArrayValue(context[on_unmount_fns]) ) {
    context[on_unmount_fns].forEach((callback)=>{
      callback(...args);
    })
    
    return ;
  }

  // console.log('to_do: ', fdNode);
} 

// 监听hash变化 
onHashChange((evt, option)=>{
  // console.log( 'unmount ', evt, option);
  if (option.init) { return ; }
  if (!['render', 'cache'].includes(option.type)) { return ; }
  
  let list = getActivedList(option.oldPathParams.path);
  list.forEach(fNd=>{
    runCpntRemove(fNd.context); 
  })
})
// 监听页面刷新 
window.addEventListener("beforeunload", (evt)=>{
  let list = getActivedList();
  // console.log(' ====================================== ', list );
  list.forEach(fNd=>{
    runCpntRemove(fNd.context, {
      event: evt, 
    }); 
  })
  
})

// 监听指定组件的 unmount 生命周期 
export default function onUnmount(context, callback){
  if ( !isFunctionValue(callback) ) { return console.error('#fd onUnmount callback error'); }
  if ( !isArrayValue(context[on_unmount_fns]) ) { return console.error('#fd onUnmount error'); }
  
  context[on_unmount_fns].push((...args)=>{
    callback(...args);
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


