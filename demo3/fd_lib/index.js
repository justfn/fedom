/* 入口文件 
*/
import compiler from "./compiler/compiler.js";
import render from "./compiler/render.js";
import Router from "./router/router.js";
import Component from "./featrues/Component/Component.js";
import onShow from "./featrues/Lifecycles/onShow.js";
import onUnmount from "./featrues/Lifecycles/onUnmount.js";
import { VaryValue, } from "./featrues/VaryModel/VaryValue.js";
import { VaryKeys, } from "./featrues/VaryModel/VaryKeys.js";
import { VaryList } from "./featrues/VaryModel/VaryList.js";
import AsyncValue from "./featrues/Async/AsyncValue.js";
import Store from "./featrues/StoreKits/Store.js";
import StoreSession from "./featrues/StoreKits/StoreSession.js";
import StoreLocal from "./featrues/StoreKits/StoreLocal.js";

// 功能 
if (!window.$fd) { window.$fd = {}; }
window.$fd.compiler = compiler;
window.$fd.render = render;
window.$fd.Router = Router;
window.$fd.Component = Component;
window.$fd.onShow = onShow;
window.$fd.onUnmount = onUnmount;
window.$fd.VaryValue = VaryValue;
window.$fd.VaryKeys = VaryKeys;
window.$fd.VaryList = VaryList;
window.$fd.AsyncValue = AsyncValue;
window.$fd.Store = Store;
window.$fd.StoreSession = StoreSession;
window.$fd.StoreLocal = StoreLocal;
// 工具 
if (!window.$fd_kit) { window.$fd_kit = {}; }
// 内部使用 
if (!window.$fd__) { window.$fd__ = {}; }

// todo: 使用代理控制, 防止变量修改 
