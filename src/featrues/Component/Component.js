/* 组件基础类  
  作用： 
  1 提供功能方法
  2 定义回调响应 
  3 ... 
*/
import {
  hashPush,
  hashReplace,
} from "../../router/changeRoute.js";
import { getRoutes, } from "../../router/router.js";
import AsyncValue from "../../utils/AsyncValue.js";

export const mounted_call_key = '$mounted';
export const on_mounted_fns = Symbol('on-mounted-fns');
export const on_unmount_fns = Symbol('on-unmount-fns');
export const on_show_fns = Symbol('on-show-fns');
export default class Component {
  /* --------------------------------------------------------- 生命周期 */
  // 渲染-前0 
  constructor(props={}){ 
    this.props = props;
    // 
  }
  // 渲染-前1 
  render(){ }
  // 渲染-后 
  [on_mounted_fns] = [];
  onMounted(){}
  // 使用缓存 
  [on_show_fns] = [];
  onShow(){}
  // 卸载-前 
  [on_unmount_fns] = [];
  onUnmount(){ }
  
  /* --------------------------------------------------------- 快捷访问 */
  [mounted_call_key] = AsyncValue(); 
  refs = {};
  
  /* --------------------------------------------------------- 工具方法 */
  // 路由功能 
  router = {
    push: hashPush,
    replace: hashReplace,
    routes: getRoutes(true),
  };
  
}

