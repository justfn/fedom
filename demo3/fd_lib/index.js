/* 入口文件 
*/

import "./utils/dev.js";
import { globalWrite, } from "./utils/globalWR.js";

import compiler from "./compiler/compiler.js";
import render from "./render.js";
import Router from "./router/router.js";
import { VaryValue, isVary, } from "./featrues/vary/Vary.js";
import Component, { isComponent } from "./featrues/Component.js";

globalWrite('compiler', compiler);
globalWrite('render', render);
globalWrite('Router', Router);
globalWrite('VaryValue', VaryValue);
globalWrite('Component', Component);
// 工具集合 
globalWrite('utils.isVary', isVary);
globalWrite('utils.isComponent', isComponent);
// 元素集合 
globalWrite('elems', {});
// 状态集合 
globalWrite('status.isLoaded', false);

export {
  render,
  Router,
  VaryValue,
  Component,
}
