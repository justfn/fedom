# fedom 框架 接口文档

# 功能对象 
```javascript 
// 引入fedom框架库  
import "@justfn/fedom";

// 框架核心功能 
const {
  // 渲染方法 
  render, 
  // 组件 
  Component, 
  // 生命周期-使用缓存时 
  onShow, 
  // 生命周期-组件卸载时 
  onUnmount, 
  // 待状态变更的Promise
  AsyncValue, 
  // 路由 
  Router, 
  // 包装任意值 
  VaryValue, 
  // 包装map类型值 
  VaryMap, 
  // 包装list类型值 
  VaryList, 
} = window.$fd;
```

## render(content, Node) 
* 渲染content内容到指定Node节点内 

```javascript 
const rootNode = document.getElementById("app"); // 获取定义的Node容器节点 
```

#### render(Str, Node)          渲染纯文本 
* Str前后的空格将被忽略 
* 返回已渲染的文本节点  

```javascript 
let result = render('abc', rootNode);
console.log( result ); // 文本节点 
```

#### render(contentNode, Node)  渲染dom节点 
* 返回已渲染的节点 

```javascript 
let divDom = document.createElement("div");
divDom.textContent = 'here is a div node'
let result = render(divDom, rootNode);
console.log( result ); // divDom节点 
```

#### render(FdNode, Node)       渲染fdNode节点 
* FdNode即 jsx 标签  
* 返回已渲染fdNode节点

```javascript 
let result = render(
  <div> jsx标签在本框架内即为 fdNode节点 </div>, 
  rootNode
);
console.log( result ); // fdNode节点  
```

#### render(Arr, Node)          渲染数组列表  
* Arr数组由  Str 或 Node 或 FdNode 或 VaryValue 组成 
* 返回该Arr数组 

```javascript 
let result = render( [
  <div>
  aaa 
  </div>,
  'bbb'
], rootNode );

console.log( result );  
```

#### render(VaryValue, Node)    渲染可变包装对象 
* VaryValue变包装对象 底层值必须为 Str | Node | FdNode | str/Node/FdNode/VaryValue等组成的数组 之一 
* 返回对应的底层值 

```javascript 
let dom1$ = VaryValue('aaa');
let result1 = render( dom1$, rootNode );
console.log( result1 );  
 
let dom2$ = VaryValue(document.createElement("input"));
let result2 = render( dom2$, rootNode );
console.log( result2 );   

let dom3$ = VaryValue( <div>123</div> );
let result3 = render( dom3$, rootNode );
console.log( result3 );   

let dom4$ = VaryValue( [
  'aaa',
  <a>bbb</a>,
  VaryValue('ccc')
] );
let result4 = render(
  dom4$, 
  rootNode
);
console.log( result4 );   

```


