/* ** 路由组件新增的属性/功能 
*/
import routerPush from "./routerPush.js";
import routerReplace from "./routerReplace.js";

export default function (routeOption, routeParams){
  
  return {
    hashQuery: {},
    _enterList: [],
    beforeRouteEnter(){ },
    routeEnter(){ },
    routeLeave(){ },
    router: {
      push: routerPush,
      replace: routerReplace,
    }, 
  };
} 



