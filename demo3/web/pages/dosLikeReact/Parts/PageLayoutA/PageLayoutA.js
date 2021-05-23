import "./PageLayoutA.less";
import PageHeader from "../PageHeader/PageHeader.js";
import PageMenu from "../PageMenu/PageMenu.js";


export default function Layout(props, context){
  context.scopeId = '002';
  
  
  
  return (
    <article className={["PageLayoutA", props.class]}>
      <div className="PageLayoutA-header">
        <PageHeader />
      </div>
      
      
      <div className="PageLayoutA-body">
        <div className="PageLayoutA-main"> { props.children } </div>
        <div className="PageLayoutA-menu"> <PageMenu /> </div>
      </div>
    </article>
  );
}

