
import router from "../../../router/router.js";

import "./FloatCatalog.less";
export default function (props, context){
  let {
    routes = [], 
  } = context;
  
  routes = router.$routes;
  let links = routes.map((itm,idx)=>{
    return (
      <div>
        <div onClick={()=>context.$push(itm.path)}>{ itm.path }</div>
      </div>
    )
  })
  
  return (
    <section class="FloatCatalog">
      { links }
    </section>
  );
}

