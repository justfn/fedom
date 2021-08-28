
import "./FloatCatalog.less";


const {
  VaryValue,
  router,
} = window.$fd;

const isFold = VaryValue(true, (val)=>{
  if (val) { return 'none'; }
  
  return '';
})

export default function FloatCatalog(props, context){
  
  let routes = [ ...router.routes ];
  routes.push({ 
    path: '/?k=v' 
  })
  let links = routes.map((itm,idx)=>{
    return (
      <div>
        <div className="routeItem" onClick={()=>router.push(itm.path)}>{ itm.path }</div>
      </div>
    )
  })
  
  let foldHandle = ()=>{
    isFold.set((val)=>{
      return !val;
    })
  }
  
  return (
    <section className="FloatCatalog" >
      <div className="fold" onClick={foldHandle}>fold</div>
      <div className="linksWp" style={{display: isFold, }}> { links } </div>
    </section>
  );
}

