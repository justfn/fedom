import "./PageLayoutA.less";
import PageHeader from "../PageHeader/PageHeader.js";
import PageMenu from "../PageMenu/PageMenu.js";
import Tst from "../Tst/Tst.js";


export default function Layout(props, context){
  context.scopeId = '002';
  
  let a = <div>123</div>
  
  
  return (
    <article class={["PageLayoutA", props.class]}>
      <div class="PageLayoutA-header">
        <PageHeader />
      </div>
      
      { a }
      
      <Tst name="02" />
      
      <div class="">
        <div> { props.children } </div>
        <div> <PageMenu /> </div>
      </div>
      <Tst name="01" />
    </article>
  );
}

