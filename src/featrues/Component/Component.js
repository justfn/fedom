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
  root = AsyncValue(); 
  refs = {};
  
  
}

