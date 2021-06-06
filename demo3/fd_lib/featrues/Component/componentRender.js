
import Component from "./Component.js";
import {
  isFDComponent,
  isComponent,
  isFunctionValue,
} from "../../utils/judge.js";
import {
  errLog, 
} from "../../utils/dev.js";

const error_arguments = 'arguments error of render component'
export default function componentRender( params ={}){
  let {
    varyTag, 
    tagName, 
    attrs,
    children, 
  } = params; 
  let props = {
    ...attrs,
    children: [...children],
  }
  try {
    // 类组件 
    if (isComponent(tagName)) {
      let context = new tagName(props);
      // Features: 优先使用'render_',便于自定义继承 
      let renderFunc = context.render_ || context.render;
      fNode = renderFunc.bind(context)();
      // console.log("000000000 ", fNode)
      fNode.context = context;
      fNode.varyTag = varyTag;
      context.root.resolve(fNode.realNode);
      return fNode;
    }
    
    // 函数组件 
    if (isFunctionValue(tagName)) {
      let context = new Component(props);
      let fNode = tagName(props, context);
      // console.log("000000000 ", fNode)
      fNode.context = context;
      fNode.varyTag = varyTag;
      context.root.resolve(fNode.realNode);
      return fNode;
    }
  } 
  catch (err) { errLog(err); } 
  
  errLog(error_arguments); 
}

