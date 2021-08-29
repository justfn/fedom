/* 入口文件 
*/
import compiler from "./compiler/compiler.js";
import render from "./compiler/render.js";
import onMounted from "./featrues/Lifecycles/onMounted.js";
import onShow from "./featrues/Lifecycles/onShow.js";
import onUnmount from "./featrues/Lifecycles/onUnmount.js";
import { VaryValue, } from "./featrues/VaryModel/VaryValue.js";
import { VaryMap, } from "./featrues/VaryModel/VaryMap.js";
import { VaryList } from "./featrues/VaryModel/VaryList.js";
import Router, { getRoutes, } from "./router/router.js";
import {
  hashPush, 
  hashReplace, 
  historyForward, 
  historyBack, 
  historyGo, 
  backUntillTo, 
} from "./router/changeRoute.js";
import AsyncValue from "./utils/AsyncValue.js";
import {
  isBooleanValue, 
  isNumberValue, 
  isStringValue, 
  isObjectValue, 
  isArrayValue, 
  isFunctionValue, 
  isNodeValue, 
  isCommentNode, 
  isFdNode, 
  isVaryValue, 
  isVaryList, 
  isVaryMap, 
  isAsyncValue, 
  isEmptyValue, 
  isTextValue, 
} from "./utils/judge.js";
import {
  parseRichText, 
} from "./utils/common.js";

// 功能 
if (!window.$fd) { window.$fd = {}; }
// 编译&渲染
window.$fd.compiler = compiler;
window.$fd.render = render;
// 组件&生命周期 
window.$fd.onMounted = onMounted;
window.$fd.onShow = onShow;
window.$fd.onUnmount = onUnmount;
// 动态数据 
window.$fd.VaryValue = VaryValue;
window.$fd.VaryMap = VaryMap;
window.$fd.VaryList = VaryList;
// 路由功能 
window.$fd.Router = Router;
if (!isObjectValue(window.$fd.router)) { window.$fd.router = {}; }
window.$fd.router = {
  ...window.$fd.router,
  push: (...args)=>hashPush(...args),
  replace: (...args)=>hashReplace(...args),
  forward: (...args)=>historyForward(...args),
  back: (...args)=>historyBack(...args),
  go: (...args)=>historyGo(...args),
  backUntillTo: (...args)=>backUntillTo(...args),
  get routes(){
    return getRoutes(true);
  },
};
if (!isObjectValue(window.$fd.route)) { window.$fd.route = {}; }
window.$fd.route = {
  ...window.$fd.route,
  get pre(){
    return '';
  },
  // get current(){
  //   return '';
  // },
};
// 其他工具 
window.$fd.AsyncValue = AsyncValue;
if (!isObjectValue(window.$fd.utils)) { window.$fd.utils = {}; }
window.$fd.utils = {
  ...window.$fd.utils,
  html: (...args)=>parseRichText(...args),
}

// 内部使用 
// const fd_private_key = Symbol('fd-private-key');
// if (!window[fd_private_key]) { window[fd_private_key] = {}; }

// todo: 使用代理控制, 防止变量修改 
