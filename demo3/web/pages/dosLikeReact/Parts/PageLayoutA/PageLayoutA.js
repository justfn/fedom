import "./PageLayoutA.less";
import PageHeader from "../PageHeader/PageHeader.js";
import PageMenu from "../PageMenu/PageMenu.js";


export default function Layout(props, context){
  context.scopeId = '002';
  
  
  
  return (
    <article class={["PageLayoutA", props.class]}>
      <div class="PageLayoutA-header">
        <PageHeader />
      </div>
      
      
      <div class="PageLayoutA-body">
        <div class="PageLayoutA-main"> { props.children } </div>
        <div class="PageLayoutA-menu"> <PageMenu /> </div>
      </div>
    </article>
  );
}

