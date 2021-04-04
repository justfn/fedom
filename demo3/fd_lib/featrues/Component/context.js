/* ** 函数组件的第二个参数 context
*/

import routerPush from "../../router/routerPush.js";
import routerReplace from "../../router/routerReplace.js";
import { getRoutes, } from "../../router/router.js";

export default function getContext(){
  
  return {
    // 渲染后将执行的回调集合 
    _mountedFns: [],
    // 搜集初始化执行操作 
    onMounted(fn){
      this._mountedFns.push(fn);
    },
    // 卸载前将执行的回调集合 
    _unmountFns: [],
    // 收集卸载前的操作  
    onUnmount(fn){
      this._unmountFns.push(fn);
    },
    // 提供插入富文本的能力 
    html(htmlStr){
      let div = document.createElement("div");
      div.innerHTML = htmlStr;
      return [...div.childNodes];
    },
    // 路由跳转能力
    push: routerPush,
    replace: routerReplace,
    routes: getRoutes(true),
  };
} 
