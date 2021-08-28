import "./PageLayoutA.less";
import PageHeader from "../PageHeader/PageHeader.js";
import PageMenu from "../PageMenu/PageMenu.js";


export default class Layout {
  scopeId = '002';
  render (props){
    
    
    
    return (
      <article className={["PageLayoutA", props.className]}>
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
}

