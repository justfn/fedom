/* 入口文件 
*/

import compiler from "./compiler/compiler.js";
import render from "./render.js";
import Router from "./router/router.js";
import { VaryValue, isVary, } from "./featrues/vary/Vary.js";
import Component, { isComponent } from "./featrues/Component.js";

if (!window.$fd) { window.$fd = {}; }
if (!window.$fd.compiler) { window.$fd.compiler = compiler; }
if (!window.$fd.render) { window.$fd.render = render; }
if (!window.$fd.Router) { window.$fd.Router = Router; }
if (!window.$fd.VaryValue) { window.$fd.VaryValue = VaryValue; }
if (!window.$fd.Component) { window.$fd.Component = Component; }
if (!window.$fd.utils) { window.$fd.utils = {}; }
window.$fd.utils.isVary = isVary;
window.$fd.utils.isComponent = isComponent;

export {
  render,
  Router,
  VaryValue,
}
