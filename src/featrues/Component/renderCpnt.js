/** 组件渲染 
*/
import { doCpntMounted, } from "../Lifecycles/onMounted.js";
import AsyncValue from "../../utils/AsyncValue.js";
import {
  isFunctionValue,
} from "../../utils/judge.js";

const render_fn_key = 'render';
const created_fn_key = 'onCreated';
const mounted_call_key = '$mounted';
export const on_mounted_fns = Symbol('on-mounted-fns');
export const on_unmount_fns = Symbol('on-unmount-fns');
export const on_show_fns = Symbol('on-show-fns');
export default function renderCpnt(componentTag, props){
  let context = null;
  let realNode = null;
  try {
    context = new componentTag(props);
    context[on_mounted_fns] = []; 
    context[on_unmount_fns] = []; 
    context[on_show_fns] = []; 
    context[mounted_call_key] = AsyncValue();
    if ( isFunctionValue(context[created_fn_key]) ) { context[created_fn_key](props); }
    // 注意：此处又将调用 compiler 
    realNode = context[render_fn_key](props).realNode;
    context[mounted_call_key].then((root)=>{
      doCpntMounted(context, root);
      return root;
    })
  } 
  catch (err) {
    console.error(err);
    throw err;
  } 
  // 将会在dom节点同步插入到根节点内后执行 
  context[mounted_call_key].resolve(realNode);
  return {
    context, 
    realNode, 
  };
} 


