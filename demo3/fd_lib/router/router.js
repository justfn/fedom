
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import formatRoutes from "./formatRoutes.js";
import routerReplace from "./routerReplace.js";
import onHashChange, { initHashChange, } from "./onHashChange.js";
import parseHash from "./parseHash.js";
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
    this._cached_routes = {
      // <path>: <PageElem>
    };
    this._beforeEach = beforeEach;
    
    // onHashChange(this._route_map, this._root, this._beforeEach);
    onHashChange( this._hashChange );
    initHashChange();
  }
  // update_cache = (path, isCache)=>{ }
  
  _hashChange = (evt)=>{
    let oldPathObj = {};
    if (evt.oldURL) {
      let oldPathObj = parseHash(evt.oldURL);
      let oldPathOption = this._route_map[oldPathObj.path] ?? {};
      
      // 缓存DOM 
      if (oldPathOption.isCache && oldPathOption.component) {
        this._cached_routes[oldPathObj.path] = this._root.lastElementChild;
        if (oldPathOption.alias) { this._cached_routes[oldPathOption.alias] = this._root.lastElementChild; }
        // console.log( '缓存html', this._root.lastElementChild );
      }
    }
    
    let pathObj = parseHash(evt.newURL);
    
    let isGo = this._beforeEach(pathObj, oldPathObj);
    if (!isGo) { 
      console.log('# 阻止路由访问', pathObj, oldPathObj);
      return ; 
    }
    
    if (!pathObj.path) {
      window.location.hash = '/'
      return ;
    }
    
    let pathOption = this._route_map[pathObj.path] ?? {};
    Promise.resolve( this._cached_routes[pathObj.path] )
    // 先读缓存 
    .then((htmlNode)=>{
      // 重定向 
      if (pathOption.redirect) {
        routerReplace(pathOption.redirect, pathObj.query);
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
        return Promise.reject(`${pathObj.path} 路由，无页面组件！`); 
      }
      // 出口3：渲染组件 
      return pathOption.component(); 
    })
    // 再解析渲染 
    .then((module)=>{
      let Cpt = module.default;
      this._root.innerHTML = '';
      render( <Cpt />, this._root )
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



