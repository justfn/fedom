
import formatRoutes from "./formatRoutes.js";
import onHashChange from "./onHashChange.js";

let _routes = [];
export default class Router {
  constructor(routeOptions = {}){ 
    const {
      routes = [
        // {
        //   path: '',
        //   alias: '',
        //   redirect: '',
        //   component: <cpt>,
        //   isCache: <bol>,
        //   children: [
        //     {
        //       path: '', // 是否以 / 开头都无区别
        //       ...
        //     },
        //     ...
        //   ],
        // },
      ],
      root = document.body,
      beforeEach = (v=>v),
    } = routeOptions;
    let {
      routeMap,
      routeList,
    } = formatRoutes(routes);
    // 路由Map
    this._route_map = routeMap;
    _routes = routeList;
    this._routes = routeList;
    this._root = root; 
    this._cached_routes = {
      // <path>: <PageElem>
    };
    this._beforeEach = beforeEach;
    
    onHashChange(this._route_map, this._root, this._beforeEach);
    
  }
  // update_cache = (path, isCache)=>{ }
}


/* 对外接口 ===================================================================*/
export function getRoutes(isOrgin=false){
  if (isOrgin) { return [..._routes];  }
  
  // todo 待优化 
  return JSON.parse(JSON.stringify(_routes));
}



