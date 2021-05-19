/* ** 路由组件新增的属性/功能 
*/
import routerPush from "./history/push.js";
import routerReplace from "./history/replace.js";

export default function routerComponentProps( oldPathParams, newPathParams, cachedPageMap){
  
  return {
    _enterList: [],
    beforeRouteEnter(){ },
    routeEnter(){ },
    routeLeave(){ },
    route: {
      path: '',
      query: '',
    },
    router: {
      push: routerPush,
      replace: routerReplace,
    }, 
  };
} 



