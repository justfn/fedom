/* 入口文件 
*/

import compiler from "./compiler/compiler.js";
import { VaryValue, } from "./vary/Vary.js";
import render from "./render.js";
import Router from "./router/router.js";

if (!window.$fd) { window.$fd = {}; }
if (!window.$fd.compiler) { window.$fd.compiler = compiler; }
if (!window.$fd.render) { window.$fd.render = render; }
if (!window.$fd.Router) { window.$fd.Router = Router; }
if (!window.$fd.VaryValue) { window.$fd.VaryValue = VaryValue; }

export {
  render,
  Router,
  VaryValue,
}
