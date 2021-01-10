
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
        <a href={`/#${itm.path}`} > {itm.path} </a>
      </div>
    )
  })
  
  return (
    <section class="FloatCatalog">
      { links }
    </section>
  );
}

