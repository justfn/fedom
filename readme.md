
<h1> 自由灵活,简单便捷的前端框架 </h1>

```
功能列表: 
1 jsx模板渲染 
2 组件化 
  ref 
    ref={<RefValue>} 异步执行  
    ref 回调函数形式 
3 生命周期 
  1 组件渲染 
    fn_run() 
      fn_run&setTimeout() 
    constructor_run() | render_run() 
      render_run&setTimeout() 
      constructor_run&setTimeout() 
  2 组件更新 
    $xxx.watch() // 监听动态值变化
    cpt.xxx(val) // 子组件的方法被调用 
  3 组件缓存 
    context.onShow() 
    onShow() 
  4 组件卸载 
    context.onUnmount 
      onUnmount&setTimeout()  
    onUnmount()       
      onUnmount&setTimeout() 
4 路由 
  router 
    缓存 
    页面级组件 context 中添加 router 和 route 
    动态设置是否缓存 [todo]
5 model->view  
  VaryValue 
    动态化内容初始化后的回调 
    动态化监听 
    动态化开关 
    动态化嵌套 
    xx$  
    xx$.$$  
  VaryMap [todo:优化]
    xx$.xx.$$  [对象键值动态化] 
  VaryList 
  vary标签 
  vary属性
    showVary={bol} 
  vary子节点
    整个数组 
    单个子节点 
    文本内容 
--------------------------------------------------------------------------------
todo: 
  写框架文档 
  表单支持 
  组件树 
  编译空间 
    data-scope_id="xx" 
  css 模块化 
  错误/编译错误 提示 
  性能优化: 
    DOM操作性能优化 
    数组子节点,默认全部替换, 
      可优化传操, 如 替换节点/增加节点/删除节点 等 
  编译模式优化考虑 
--------------------------------------------------------------------------------













```

