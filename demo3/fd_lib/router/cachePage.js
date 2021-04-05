/* ** 页面缓存处理 

*/
import { isFunctionValue, } from "../utils/judge.js";

let cachedPageMap = {};
export default function cachePage(routeMap, routeParams, pageElem){
  if (!routeParams) { return {}; }   
  
  let path = routeParams.path;
  let routeOption = routeMap[ path ] ?? {};
  
  if ( routeOption.component ) {
    let isCache = routeOption.isCache;
    if ( isFunctionValue(isCache) ) { isCache = isCache(); }
    
    if ( isCache ) {
      cachedPageMap[ path ] = pageElem;
      let alias = routeOption.alias;
      if (alias) { cachedPageMap[ alias ] = pageElem; }
    }
    else {
      cachedPageMap[ path ] = null;
    }
  }
  
  return cachedPageMap;
} 


