const {
  Router,
} = window.$fd;
import homePage from "../pages/home/home.js";


const routes_ = [
  // 首页、主页 
  {
    path: '/',
    component: ()=>homePage,
    alias: '/home',
    isCache: true, // bol|fn,是否缓存 
  },
  // 测试 
  {
    path: '/test',
    alias: '/test/home',
    // redirect: '/home', 
    component: ()=>import('../pages/test/home/home.js'),
    isCache: true, // bol|fn,是否缓存 
    children: [
      // {
      //   path: 'home',
      //   // component: ()=>import('../pages/test/home/home.js'),
      // },
      {
        path: 'cpntScpoe',
        component: ()=>import('../pages/test/cpntScpoe/cpntScpoe.js'),
      },
      {
        path: 'chooseList',
        component: ()=>import('../pages/test/chooseList/chooseList.js'),
      },
      {
        path: 'other',
        component: ()=>import('../pages/test/other/other.js'),
      },
    ],
  },
  // 特性展示 
  {
    path: '/features',
    // alias: '/feature/home',
    // component: ()=>import('../pages/fealture/fealtureHome/fealtureHome.js'),
    isCache: true, // bol|fn,是否缓存 
    children: [
      // 无法进入的页面 
      {
        path: 'unpass',
        component: ()=>import('../pages/fealture/jsx/jsx.js'),
      },
      {
        path: 'jsx',
        component: ()=>import('../pages/fealture/jsx/jsx.js'),
      },
      {
        path: 'upLogic',
        isCache: true, // bol|fn,是否缓存 
        component: ()=>import('../pages/fealture/upLogic/upLogic.js'),
      },
    ],
  },
  // 文档 
  {
    path: '/docs',
    alias: '/docs/home',
    isCache: true, // bol|fn,是否缓存 
    children: [
      {
        path: 'home',
        component: ()=>import('../pages/docs/home/docsHome.js'),
      },
    ],
  },
  // 应用：特性综合使用 
  {
    path: '/apps',
    component: ()=>import('../pages/apps/appHome/appHome.js'),
    isCache: true, // bol|fn,是否缓存 
    children: [
      {
        path: 'TicTacToe',
        component: ()=>import('../pages/apps/TicTacToe/TicTacToe.js'),
      },
      {
        path: 'TicTacToeV2',
        component: ()=>import('../pages/apps/TicTacToeV2/TicTacToe.js'),
      },
      {
        path: 'TodoList',
        component: ()=>import('../pages/apps/TodoList/todoList.js'),
      },
    ],
  },
  // 仿造react官网 
  {
    path: '/dosLikeReact',
    redirect: '/dosLikeReact/home',  // 
    isCache: true, // bol|fn,是否缓存 
    children: [
      {
        path: '/home',
        isCache: true, // bol|fn,是否缓存 
        component: ()=>import('../pages/dosLikeReact/home/home.js'),
      },
    ],
  },
  // 个人简历  
  {
    path: '/resume',
    redirect: '/resume/home',  // 
    isCache: true, // bol|fn,是否缓存 
    children: [
      {
        path: '/home',
        isCache: true, // bol|fn,是否缓存 
        component: ()=>import('../pages/resume/home/home.js'),
      },
    ],
  },
  
]



const options = {
  routes: routes_,
  root: document.querySelector("#app"),
  beforeEach(oldPathParams, newPathParams){
    if (newPathParams.path==='/features/unpass') { return false; }
    
    return true;
  },
}
const router = new Router(options);

export default router; 


