/* ** 组件渲染后回调 
*/


export default function onUnmounted(fNode){
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
    
  })
} 



