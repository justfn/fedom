/* ** 处理路由，将路由Map化 
返回格式化后的 routeMap 
*/


export default function formatRoutes(routes, prePath='', routeMap={}, routeList=[]){
  routes.forEach((pathOption,idx)=>{
    let pathKey = pathOption.path;
    if ( !/^\//.test(pathKey) ) { pathKey = `/${pathKey}`; }
    pathKey = prePath + pathKey;
    if (pathOption.alias) {
      let _opt = { ...pathOption }
      routeMap[_opt.alias] = _opt;
      _opt._alias = _opt.alias;
      delete _opt.alias;
      pathOption = _opt;
    }
    routeMap[pathKey] = pathOption;
    routeList.push({
      ...pathOption,
      path: pathKey,
    })
    let children = pathOption.children;
    if (children) {
      formatRoutes(children, pathKey, routeMap, routeList)
    }
  })
  return {
    routeMap: routeMap,
    routeList: routeList,
  };
} 

