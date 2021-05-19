/* 组件基础类  
  作用： 
  1 提供功能方法
  2 定义回调响应 
  3 ... 
*/
import routerPush from "../../router/routerPush.js";
import routerReplace from "../../router/routerReplace.js";
import { getRoutes, } from "../../router/router.js";
import utils from "./utils.js";
import { RefValue, } from "../ref/Ref.js";

export default class Component {
  /* --------------------------------------------------------- 生命周期 */
  // // 渲染-后 
  // onMounted(){}
  // 渲染-前0 
  constructor(props={}){ 
    this.props = props;
    // 
  }
  // 渲染-前1 
  render(){ }
  // 使用缓存 
  _onShowFns = [];
  onShow(){}
  // 卸载-前 
  _onUnmountFns = [];
  onUnmount(){ }
  
  /* --------------------------------------------------------- 快捷访问 */
  root = RefValue(); 
  refs = {};
  /* --------------------------------------------------------- 工具方法 */
  // 路由功能 
  router = {
    push: routerPush,
    replace: routerReplace,
    routes: getRoutes(true),
  };
  // 其他工具方法集合 
  utils = {...utils};
  
}

