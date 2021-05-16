const {
  Router,
} = window.$fd;


const routes_ = [
  // 首页、主页 
  {
    path: '/',
    component: ()=>import('../pages/home/home.js'),
    alias: '/home',
    isCache: true, // bol|fn,是否缓存 
  },
  // 特性展示 
  {
    path: '/feature',
    // alias: '/feature/home',
    // component: ()=>import('../pages/fealture/fealtureHome/fealtureHome.js'),
    isCache: true, // bol|fn,是否缓存 
    children: [
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
  // 其他测试点
  {
    path: '/test',
    redirect: '/home',  // #todo: fixbug 
    isCache: true, // bol|fn,是否缓存 
    children: [
      {
        path: 'home',
        component: ()=>import('../pages/test/testHome/testHome.js'),
      },
      {
        path: 'chooseList',
        component: ()=>import('../pages/test/chooseList/chooseList.js'),
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
    if (newPathParams.path==='/test/home') { return false; }
    
    return true;
  },
}
const router = new Router(options);

export default router; 


