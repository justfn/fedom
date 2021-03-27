


```
生命周期
  1 渲染前 
    fn_run 
    constructor_run 
  2 渲染后 
    onMounted
    fn_run setTimeout 
    render_run setTimeout 
  3 组件更新   
    props.xx.watch() 
  3 组件卸载 
    context.onUnmount 
    context.onUnmounted 
    onUnmount
    onUnmounted
    实现思路: MutationObserver 
























```
