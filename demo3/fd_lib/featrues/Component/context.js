/* ** 函数组件的第二个参数 context
*/

import routerPush from "../../router/history/push.js";
import routerReplace from "../../router/history/replace.js";
import { getRoutes, } from "../../router/router.js";
import utils from "./utils.js";
import { RefValue, } from "../ref/Ref.js";
import { 
  isFunctionValue, 
} from "../../utils/judge.js";

export default function getContext(){
  
  return {
    /* --------------------------------------------------------- 生命周期 */
    // // 渲染后将执行的回调集合 
    // _mountedFns: [],
    // // 搜集初始化执行操作 
    // onMounted(fn){
    //   this._mountedFns.push(fn);
    // },
    _onShowFns: [],
    onShow(fn){
      if (!isFunctionValue(fn)) { return ; }
      
      this._onShowFns.push(fn);
    },
    // 卸载前将执行的回调集合 
    _onUnmountFns: [],
    // 收集卸载前的操作  
    onUnmount(fn){
      if (!isFunctionValue(fn)) { return ; }
      
      this._onUnmountFns.push(fn);
    },
    
    /* --------------------------------------------------------- 快捷访问 */
    root: RefValue(),
    // 
    refs: {
      // 
    },
    /* --------------------------------------------------------- 工具方法 */
    // 路由功能 
    router: {
      push: routerPush,
      replace: routerReplace,
      routes: getRoutes(true),
    },
    // 其他工具方法集合
    utils: {...utils},
  };
} 
