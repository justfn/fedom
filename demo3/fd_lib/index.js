/* 入口文件 
*/
import "./featrues/lifecycle/index.js";
import "./utils/dev.js";
import { globalWrite, } from "./utils/globalWR.js";

import compiler from "./compiler/compiler.js";
import render from "./render.js";
import Router from "./router/router.js";
import Component from "./featrues/Component/Component.js";
import { VaryValue, } from "./featrues/Vary/Vary.js";
import VaryKeys from "./featrues/Vary/VaryKeys.js";
import VaryList from "./featrues/Vary/VaryList.js";
import { RefValue, } from "./featrues/ref/Ref.js";
import { 
  isComponentValue, 
  isVaryValue, 
} from "./utils/judge.js";

globalWrite('compiler', compiler);
globalWrite('render', render);
globalWrite('Router', Router);
globalWrite('VaryValue', VaryValue);
globalWrite('VaryKeys', VaryKeys);
globalWrite('VaryList', VaryList);
globalWrite('RefValue', RefValue);
globalWrite('Component', Component);
// 工具集合 
globalWrite('utils.isVaryValue', isVaryValue);
globalWrite('utils.isComponentValue', isComponentValue);
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
