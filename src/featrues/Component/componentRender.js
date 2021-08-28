/** 组件渲染 
*/
import AsyncValue from "../../utils/AsyncValue.js";

export default function componentRender(componentTag, props){
  let context = null;
  let realNode = null;
  try {
    context = new componentTag(props);
    context.$root = AsyncValue();
    context._onShowFns = []; // todo: 
    context._onUnmountFns = []; // todo: 
    // 注意：此处又将调用 compiler 
    realNode = context.render(props).realNode;
  } 
  catch (err) {
    console.error(err);
    throw err;
  } 
  context.$root.resolve(realNode);
  return {
    context, 
    realNode, 
  };
  
} 


