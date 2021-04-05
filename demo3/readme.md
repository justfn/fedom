

```
--------------------------------------------------------------------------------
生命周期
  1 渲染前 
    fn_run 
    constructor_run 
  2 渲染后 
    onMounted
    fn_run setTimeout 
    render_run setTimeout 
  3 组件卸载 
    context.onUnmount 
    context.onUnmounted  onUnmount&setTimeout  
    onUnmount
    onUnmounted onUnmount&setTimeout 
    实现思路: 
      1 MutationObserver 
      2 路由切换时&组件替换时 
  4 组件更新   
    $xx.watch() 
  5 路由事件 
    onEnter todo 
    onLeave todo 
--------------------------------------------------------------------------------
Features: 
  jsx 编码模式 
  vary 
    动态化内容初始化后的回调 
    动态化监听 
    动态化开关 
    动态化嵌套 
  vary标签
  vary属性
  vary子节点
    整个数组 
    单个子节点 
    文本内容 
  component 
    ref 回调函数形式 
  router 
    缓存 
    页面级组件 context 中添加 router 和 route 
--------------------------------------------------------------------------------
todo: 
  写框架文档 
  编译空间 
    ref 字符串形式支持 
    data-scope_id="xx" 
  表单支持 
  css 模块化 
  性能优化: 
    DOM操作性能优化 
    数组子节点,默认全部替换, 
      可优化传操, 如 替换节点/增加节点/删除节点 等 
  编译模式优化考虑 
--------------------------------------------------------------------------------

```

