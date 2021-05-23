
import "./FloatCatalog.less";


const {
  VaryValue,
} = window.$fd;

const isFold = VaryValue(true, (val)=>{
  if (val) { return 'none'; }
  
  return '';
})

export default function FloatCatalog(props, context){
  
  let routes = [...context.router.routes];
  routes.push({ 
    path: '/?k=v' 
  })
  let links = routes.map((itm,idx)=>{
    return (
      <div>
        <div class="routeItem" onClick={()=>context.router.push(itm.path)}>{ itm.path }</div>
      </div>
    )
  })
  
  let foldHandle = ()=>{
    isFold.set((val)=>{
      return !val;
    })
  }
  
  return (
    <section class="FloatCatalog" >
      <div class="fold" onClick={foldHandle}>fold</div>
      <div class="linksWp" style={{display: isFold, }}> { links } </div>
    </section>
  );
}

