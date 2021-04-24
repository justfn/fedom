
import Tst from "../Tst/Tst.js";
import PageHeader from "../PageHeader/PageHeader.js";

export default function PageMenu(props, context){
  context.scopeId = '003';
  
  return (
    <section class="part-PageMenu">
      PageMenu
      
      <Tst name="001" />
      <Tst name="002" />
      
      <PageHeader />
    </section>
  );
}