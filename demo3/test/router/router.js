
import Router from "../../libs/router/router.js";


export default new Router({
  routes: [
    {
      path: '/home',
      component: ()=>import('../views/pages/home/home.js'),
    },
    {
      path: '/tic_tac_toe',
      component: ()=>import('../views/pages/tic_tac_toe/tic_tac_toe.js'),
    },
  ],
})


