/** 组件渲染 
*/
import { runCpntMounted, } from "../Lifecycles/onMounted.js";
import {
  isComponent, 
  // isFunctionValue, 
} from "../../utils/judge.js";
import Component, {
  mounted_call_key, 
} from "./Component.js";

const render_fn_key = 'render';
export default function componentRender(componentTag, props){
  let context = null;
  let realNode = null;
  try { 
    // 类组件 
    if ( isComponent(componentTag) ) { 
      context = new componentTag(props); 
      // 注意：此处又将调用 compiler 
      realNode = context[render_fn_key](props).realNode;
    }
    // 函数组件 
    else {
      context = new Component(props); 
      // 注意：此处又将调用 compiler 
      realNode = componentTag(props, context).realNode; 
    }
    
    context[mounted_call_key].then((root)=>{
      runCpntMounted(context, root);
      return root;
    })
    context[mounted_call_key].resolve(realNode);
  } 
  catch (err) {
    console.error(err);
    throw err;
  } 
  
  return {
    context, 
    realNode, 
  };
} 


