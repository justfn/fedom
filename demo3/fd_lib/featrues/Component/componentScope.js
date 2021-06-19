// todo: 待完成的功能  


import {
  isFDComponent, 
} from "../../utils/judge.js";


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

export function compilerBefore( tagName, attrs, children ){
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
} 

export function compilerAfter(fdNode){
  let {
    tagName, 
  } = fdNode; 
  
  if (isFDComponent(tagName)) {
    fdNode.realNode.setAttribute("data-scope-id", current_scope.id)
    if (!current_scope.parent) { console.error('error todo 11'); }
    current_scope = current_scope.parent;
  }
  
  // 页面全部初始化完毕 
  if (!current_scope.parent) {
    // console.log( '页面全部初始化完毕' );
    scope_tree = {};
    current_scope = scope_tree;
  }
} 

