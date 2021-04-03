


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
    实现思路: 
      MutationObserver 
      页面切换时机, 组件切换时机 触发 



性能优化: 
  数组子节点,默认全部替换, 
    可优化传操, 如 替换节点/增加节点/删除节点 等 




todo: 
  路由 redirect bug 修复  
  写框架文档 














```
