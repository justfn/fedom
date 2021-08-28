/* ** 路由组件新增的属性/功能 
*/
import {
  hashPush,
  hashReplace,
} from "./changeRoute.js";

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
      push: hashPush,
      replace: hashReplace,
    }, 
  };
} 



