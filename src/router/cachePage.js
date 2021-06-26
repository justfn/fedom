/* ** 页面缓存处理 

*/
import { 
  isFunctionValue, 
} from "../utils/judge.js";


const store = {
  cachedPathElemMap: {
    // <path>: <Element>
  },
}
export default function cachePage(routeMap, routeParams, pageElem){
  if (!routeParams) { return {}; }   
  
  let path = routeParams.path;
  let routeOption = routeMap[ path ] ?? {};
  
  if ( routeOption.component ) {
    let isCache = routeOption.isCache;
    if ( isFunctionValue(isCache) ) { isCache = isCache(); }
    
    if ( isCache ) {
      store.cachedPathElemMap[ path ] = pageElem;
      let alias = routeOption.alias;
      if (alias) { store.cachedPathElemMap[ alias ] = pageElem; }
    }
    else {
      store.cachedPathElemMap[ path ] = null;
    }
  }
  
  return store.cachedPathElemMap;
} 


