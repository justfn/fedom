/* 入口文件 
*/

import compiler from "./compiler/compiler.js";
import { VaryValue, } from "./vary/Vary.js";
import render from "./render.js";
import Router from "./router/router.js";

if (!window.$fd_compile) { 
  window.$fd_compile = compiler; 
}
if (!window.$VaryValue) { 
  window.$VaryValue = VaryValue; 
}

export {
  render,
  Router,
  VaryValue,
}
