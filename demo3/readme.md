

```
--------------------------------------------------------------------------------
生命周期
  1 组件渲染 
    fn_run() 
      fn_run&setTimeout() 
    constructor_run() | render_run() 
      render_run&setTimeout() 
      constructor_run&setTimeout()  
  2 组件更新 
    $xxx.watch() 
  3 组件缓存 
    context.onShow() 
    onShow()
  4 组件卸载 
    context.onUnmount 
      onUnmount&setTimeout()  
    onUnmount()       
      onUnmount&setTimeout() 
--------------------------------------------------------------------------------
Features: 
  jsx 编码模式 
  vary 
    动态化内容初始化后的回调 
    动态化监听 
    动态化开关 
    动态化嵌套 
    xx$  
    xx$.$$   
    xx$.xx.$$  [对象键值动态化] 
  vary标签 
  vary属性
    varyShow={bol} 
  vary子节点
    整个数组 
    单个子节点 
    文本内容 
  component 
    ref
      ref={<RefValue>} 异步执行  
      ref 回调函数形式 
      不支持string_ref 
    render 
      render_  ->  render 
  router 
    缓存 
    页面级组件 context 中添加 router 和 route 
    动态设置是否缓存 [todo]
--------------------------------------------------------------------------------
todo: 
  写框架文档 
  编译空间 
    data-scope_id="xx" 
  表单支持 
  css 模块化 
  错误/编译错误 提示 
  性能优化: 
    DOM操作性能优化 
    数组子节点,默认全部替换, 
      可优化传操, 如 替换节点/增加节点/删除节点 等 
  编译模式优化考虑 
--------------------------------------------------------------------------------













```

