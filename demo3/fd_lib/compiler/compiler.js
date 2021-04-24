/* 编译器 
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import createFNode from "./fNode/fNode.js";
import addAttrs from "./attrs/addAttrs.js";
import fillChildren from "./child/fillChild.js";

import { 
  isFDComponent, 
} from "../utils/judge.js";

let _order_num = 0; 

/* ** 处理 jsx 
执行顺序 & 深度优先 
tagName   tagNameStr|componentFn|vary 
attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
children  [ str|elem|arr|vary ] 
*/
let scope_tree = {
  // id: '',
  // level: 0,
  // parent: null,
  // children: [
  //   {
  //     children: [
  // 
  //     ],
  //   }
  // ],
}
let current_scope = scope_tree;
export default function compiler(tagName, attrs, ...children){
  if (isFDComponent(tagName)) {
    if (!current_scope.children || !current_scope.children.length) { 
      let level = current_scope.level!==undefined ? current_scope.level+1 : 0;
      current_scope.children = [
        {
          index: 0, 
          level, 
          parent: current_scope,
          children: [],
          _tagName: tagName, 
          _attrs: attrs,
          _children: children,
        } 
      ]
    }
    else {
      current_scope.children.push({
        ...current_scope.children[0],
        index: current_scope.children.length, 
        level: current_scope.children[0].level, 
        children: [],
        _tagName: tagName, 
        _attrs: attrs,
        _children: children,
      })
    }
    current_scope = current_scope.children[current_scope.children.length-1];
  }
  // console.log('##### compiler 1', tagName, attrs, children, current_scope);
  
  attrs = attrs ?? {};
  _order_num++;
  
  // log( 
  //   '# compiler_1', 
  //   // tagName, 
  //   // attrs, 
  //   // children 
  // );
  const fNode = createFNode({
    varyTag: null, 
    tagName, 
    attrs, 
    children,
    scopeObj: current_scope,
  });
  // log( 
  //   '# compiler_2', 
  //   // tagName, 
  //   // attrs, 
  //   // children 
  // );
  addAttrs( fNode );
  fillChildren( fNode );
  
  // let temp_scope = current_scope;
  if (isFDComponent(tagName)) {
    fNode.realNode.setAttribute("data-scope-id", current_scope.id)
    if (!current_scope.parent) { console.error('error todo 11'); }
    // console.log(current_scope, fNode);
    current_scope = current_scope.parent;
  }
  
  // 页面全部初始化完毕 
  if (!current_scope.parent) {
    // console.log( '页面全部初始化完毕' );
    scope_tree = {};
    current_scope = scope_tree;
  }
  // console.log('##### compiler 2' );
  return fNode.realNode;
}




