
import { Router, } from "../../fd_lib/index.js";


export default new Router({
  routes: {
    '/home': {
      alias: '/',
      component: ()=>import('../views/pages/home/home.js'),
      isCache: true, // bol|fn,是否缓存 
      children: {
        'tic_tac_toe': {
          component: ()=>import('../views/pages/tic_tac_toe/tic_tac_toe.js'),
          isCache: false, // bol|fn,是否缓存 
        },
      },
    },
    '/aaa': {
      redirect: '/tic_tac_toe',
      isCache: true, // bol|fn,是否缓存 
    },
    '/tic_tac_toe': {
      component: ()=>import('../views/pages/tic_tac_toe/tic_tac_toe.js'),
      isCache: true, // bol|fn,是否缓存 
    },
  },
  root: document.querySelector("#app"),
  beforeEach(pathObj, prePathObj){
    console.log( pathObj, prePathObj );
    if (pathObj.path==='/aaa') { return false; }
    
    return true;
  },
})


