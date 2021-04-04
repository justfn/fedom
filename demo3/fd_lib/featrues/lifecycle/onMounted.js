/* ** 组件渲染后回调 
*/
import { globalWrite, globalRead, } from "../../utils/globalWR.js";

export default function onUnmounted(fNode, num){
  // to_do_: setTimeout待优化  
  setTimeout(()=>{
    if (fNode.context._mountedFns && fNode.context._mountedFns.length ) {
      fNode.context._mountedFns.forEach((fn)=>{
        fn && fn(fNode);
      });
    }
    if (fNode.instance.onMounted) {
      fNode.instance.onMounted(fNode);
    }
    
    pageLoaded(fNode, num);
  })
} 


/* todo: page_loaded 功能 */
function pageLoaded(fNode, num){
  if (
    fNode.realNode.parentElement!==globalRead('elems.root') 
    || globalRead('status.isLoaded')
  ) { return ; }
  globalWrite('status.isLoaded', true);
  
  globalWrite('status.pageNodeNum', num);
  console.log( num );
} 

