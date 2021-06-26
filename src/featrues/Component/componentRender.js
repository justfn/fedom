/** 组件渲染 
*/
import {
  isComponent, 
  // isFunctionValue, 
} from "../../utils/judge.js";
import Component from "./Component.js";

export default function componentRender(componentTag, props){
  // 类组件 
  if ( isComponent(componentTag) ) { 
    let context = new componentTag(props);
    // 注意：此处又将调用 compiler 
    let realNode = context.render().realNode;
    context.root.resolve(realNode);
    return {
      context, 
      realNode, 
    };
  }
  
  // 函数组件 
  let context = new Component(props);
  // 注意：此处又将调用 compiler 
  let realNode = componentTag(props, context).realNode;
  context.root.resolve(realNode);
  return {
    context, 
    realNode, 
  };
} 


