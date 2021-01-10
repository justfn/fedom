
import { Router, } from "../../libs/index.js";


export default new Router({
  routes: {
    '/home': {
      component: ()=>import('../views/pages/home/home.js'),
      isCache: true, // bol|fn,是否缓存 
      children: {
        'tic_tac_toe': {
          component: ()=>import('../views/pages/tic_tac_toe/tic_tac_toe.js'),
          isCache: false, // bol|fn,是否缓存 
        },
      },
    },
    '/tic_tac_toe': {
      component: ()=>import('../views/pages/tic_tac_toe/tic_tac_toe.js'),
      isCache: true, // bol|fn,是否缓存 
    },
  },
  root: document.querySelector("#app"),
})


