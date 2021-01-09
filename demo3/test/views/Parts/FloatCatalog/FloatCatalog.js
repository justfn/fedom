
import "./FloatCatalog.less";
export default function (props, context){
  let {
    routes = [], 
  } = context;
  
  routes = [
    {
      path: '/home',
    },
    {
      path: '/tic_tac_toe',
    },
  ]
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