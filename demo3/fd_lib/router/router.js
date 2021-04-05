
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import formatRoutes from "./formatRoutes.js";
import parseHash from "./parseHash.js";
import onHashChange, { initHashChange, } from "./onHashChange.js";
import routerReplace from "./routerReplace.js";
import routerComponentProps from "./routerComponentProps.js";
import cachePage from "./cachePage.js";
import render from "../render.js";

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
    this._beforeEach = beforeEach;
    
    onHashChange( this._hashChange );
    initHashChange();
  }
  // update_cache = (path, isCache)=>{ }
  
  _hashChange = (evt)=>{
    let oldPathParams = parseHash(evt.oldURL);
    let newPathParams = parseHash(evt.newURL);
    
    console.log( ' hashchange ', 1);
    if (!newPathParams.path) {
      window.location.hash = '/'
      console.log( ' hashchange ', 2);
      return ;
    }
    let isGo = this._beforeEach(oldPathParams, newPathParams) ?? true;
    if (!isGo) { 
      console.log( ' hashchange ', 3);
      console.log('# 阻止路由访问', newPathParams, oldPathParams);
      return ; 
    }
    
    console.log( ' hashchange ', 4);
    let cachedPageMap = cachePage(this._route_map, oldPathParams, this._root.lastElementChild );
    let pathOption = this._route_map[newPathParams.path] ?? {};
    let showComponent = cachedPageMap[ newPathParams.path ];
    Promise.resolve( showComponent )
    // 先读缓存 
    .then((htmlNode)=>{
      // 重定向 
      if (pathOption.redirect) {
        routerReplace(pathOption.redirect, newPathParams.query);
        return Promise.reject();
      }
      
      // 出口1：读缓存 
      if (htmlNode) { 
        let isExit = [ ...this._root.childNodes ].some((itm,idx)=>{
          return itm === htmlNode;
        })
        if (isExit) { 
          // console.log('# 不重复渲染相同DOM', htmlNode);
          return Promise.reject(); 
        }
        
        this._root.innerHTML = '';
        // console.log('# 加载缓存', htmlNode);
        render( htmlNode, this._root );
        return Promise.reject();
      }
      // 出口2：报错 
      if (!pathOption.component) { 
        return Promise.reject(`${newPathParams.path} 路由，无页面组件！`); 
      }
      // 出口3：渲染组件 
      return pathOption.component(); 
    })
    // 再解析渲染 
    .then((module)=>{
      let Cpt = module.default;
      this._root.innerHTML = '';
      render( 
        <Cpt {...routerComponentProps(oldPathParams, newPathParams, cachedPageMap)} />, 
        this._root 
      );
    })
    .catch((err)=>{
      if (err) { console.error(err); }
    })

  }
}


/* 对外接口 ===================================================================*/
export function getRoutes(isOrgin=false){
  if (isOrgin) { return [..._routes];  }
  
  // todo 待优化 
  return JSON.parse(JSON.stringify(_routes));
}



