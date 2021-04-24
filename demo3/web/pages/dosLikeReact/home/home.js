import "./home.less";
import PageLayoutA from "../Parts/PageLayoutA/PageLayoutA.js";
import Tst from "../Parts/Tst/Tst.js";


export default function Home(props, context){
    context.scopeId = '001';
  
  return (
    // <h1> Hello World </h1>
    <PageLayoutA class="dosLikeReact-home">
      
      <Tst name="1"/>
      <Tst name="2"/>
      <Tst name="3"/>
      <Tst name="4"/>
      <Tst name="5"/>
      
      
      <div>1</div>
      <div>2</div>
      
      
    </PageLayoutA>
  );
}


