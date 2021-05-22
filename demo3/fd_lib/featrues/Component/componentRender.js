
import Component from "./Component.js";
import {
  isComponent,
  isFunctionValue,
} from "../../utils/judge.js";

export default function componentRender(Cpnt, props={}){
  let context = null;
  let renderNode = null;
  
  try {
    // 类组件 
    if (isComponent(Cpnt)) {
      context = new Cpnt(props);
      // Features: 优先使用'render_',便于自定义继承 
      let renderFunc = context.render_ || context.render;
      renderNode = renderFunc.bind(context)();
    }
    else if (isFunctionValue(Cpnt)) {
      context = new Component(props);
      renderNode = Cpnt(props, context);
    }
    else { console.error('#fd componentRender arguments error', Cpnt, props); }
    context.root._resolve(renderNode);
  } 
  catch (err) {
    console.error(err);
    throw err;
  } 
  
  return {
    context,
    renderNode,
  };
} 

