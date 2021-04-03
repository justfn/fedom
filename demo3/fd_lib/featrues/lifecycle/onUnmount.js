/* ** 卸载前
*/
import config from "../../config/config.js";

export default function onUnmount(fNode){
  // 方法一: 
  // observe(fNode);
  
  // 方法二: 
  onRemoveNode(fNode);
  
} 


function onRemoveNode(fNode){
} 
function observe(fNode){
  // // 非组件节点不处理 
  // if (fNode.nodeType===config.tag_types.origin) { return ; }
  // // 组件防重处理 
  // if (fNode.children.length>0) { return ; } 
  // 
  // setTimeout(()=>{
  // 
  //   // 定义监听回调 
  //   let obCallback = (mutations,observer)=>{
  //     mutations.forEach((mutation)=>{
  //       console.log(mutation);
  //       console.log( mutation.removedNodes );
  //     })
  //   }
  //   // 定义变动观察器 
  //   let mutation = new MutationObserver(obCallback);
  //   console.log( fNode );
  //   // 观察目标节点 
  //   mutation.observe(fNode.realNode.parentNode, {
  //     // characterData: false,
  //     // attributes: false,
  //     childList: true,
  //     // subtree: false,
  //     // attributeOldValue: false,
  //     // characterDataOldValue: false,
  //     // attributeFilter: [],
  //   })
  // 
  // })
} 


