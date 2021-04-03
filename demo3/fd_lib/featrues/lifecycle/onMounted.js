/* ** 组件渲染后回调 
to_do_: 待优化 */

export default function onUnmounted(fNode){
  setTimeout(()=>{
    if (fNode.context._mountedFns) {
      fNode.context._mountedFns.forEach((fn)=>{
        fn && fn(fNode);
      });
    }
    if (fNode.instance.onMounted) {
      fNode.instance.onMounted(fNode);
    }

  })
} 


