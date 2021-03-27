import { $push, $replace, $getRoutes } from "../../router/router.js";

function add_cpt_apis(cpt, attrs, children){
  let context = {
    _mountedFns: [],
    // 搜集初始化执行操作 
    mounted(fn){
      this._mountedFns.push(fn)
    },
    // 提供插入富文本的能力 
    html(htmlStr){
      let div = document.createElement("div")
      div.innerHTML = htmlStr;
      return [...div.childNodes];
    },
    // 路由跳转能力
    $push,
    $replace,
    $routes: $getRoutes(true),
  };
  attrs.children = [...children];
  let elem = cpt(attrs, context);
  return {
    elem,
    context,
  };
}
export default add_cpt_apis;


