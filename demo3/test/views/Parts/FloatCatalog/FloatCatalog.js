

import "./FloatCatalog.less";
export default function (props, context){
  
  let routes = [...context.$routes];
  console.log( routes );
  routes.push({
    path: '/'
  })
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

