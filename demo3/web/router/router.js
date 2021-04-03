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
    ],
  },
]

const options = {
  routes: routes_,
  root: document.querySelector("#app"),
  beforeEach(pathObj, prePathObj){
    // console.log( pathObj, prePathObj );
    if (pathObj.path==='/aaa') { return false; }
    
    return true;
  },
}
const router = new Router(options);

export default router; 


