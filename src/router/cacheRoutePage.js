/* ** 页面缓存处理 

*/
import { 
  isFunctionValue, 
} from "../utils/judge.js";


let path_elem_store_map = {
  // <path>: <Element>
}
export default function cachePage(routeMap, routeParams, pageElem){
  if (!routeParams) { return {}; }   
  
  let path = routeParams.path;
  let routeOption = routeMap[ path ] ?? {};
  
  if ( routeOption.component ) {
    let isCache = routeOption.isCache;
    if ( isFunctionValue(isCache) ) { isCache = isCache(); }
    
    if ( isCache ) {
      path_elem_store_map[ path ] = pageElem;
      let alias = routeOption.alias;
      if (alias) { path_elem_store_map[ alias ] = pageElem; }
    }
    else {
      path_elem_store_map[ path ] = null;
    }
  }
  
  return path_elem_store_map;
} 


