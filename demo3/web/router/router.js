
import { Router, } from "../../fd_lib/index.js";

const routes = {
  // 首页、主页 
  '/': {
    component: ()=>import('../views/pages/home/home.js'),
    alias: '/home',
    isCache: true, // bol|fn,是否缓存 
  },
  // 特性展示 
  '/feature': {
    // alias: '/feature/home',
    // component: ()=>import('../views/pages/fealture/fealtureHome/fealtureHome.js'),
    isCache: true, // bol|fn,是否缓存 
    children: {
      'jsx': {
        component: ()=>import('../views/pages/fealture/jsx/jsx.js'),
      },
    }, 
  },
  // 应用：特性综合使用 
  '/apps': {
    component: ()=>import('../views/pages/apps/appHome/appHome.js'),
    isCache: true, // bol|fn,是否缓存 
    children: {
      'TicTacToe': {
        component: ()=>import('../views/pages/apps/TicTacToe/TicTacToe.js'),
      },
    },
  },
  // 其他测试点 
  '/test': {
    redirect: '/home',  // #todo: fixbug 
    isCache: true, // bol|fn,是否缓存 
    children: {
      'home': {
        component: ()=>import('../views/pages/test/testHome/testHome.js'),
      },
    }
  },
}
const options = {
  routes,
  root: document.querySelector("#app"),
  beforeEach(pathObj, prePathObj){
    // console.log( pathObj, prePathObj );
    if (pathObj.path==='/aaa') { return false; }
    
    return true;
  },
}
const router = new Router(options);

export default router; 


