import { useVary } from "../../../../../fd_lib/index.js";

import "./jsx.less";
import PageA from "../../../Parts/PageA/PageA.js";
import Header from "../../../Parts/Header/Header.js";
import Section from "../../../Parts/Section/Section.js";
import CptA from "./CptA.js";

export default function pageJSX(props,context){
  
  
  
  return (
    <PageA>
      <Header name={'特性-JSX能力'} />
      
      { /* 注释，默认什么都不会渲染 */ }
      
      <Section title="渲染文本">
        <hr />
        { '@@@@@@@@@@@@@' }
      </Section>
      
      
      
      <section>
        渲染html 
        <ol>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ol>
        
        {
          ['a','b','c'].map((itm,idx)=>{
            return <dd>{itm}</dd>
          })
        }
      </section>
      
      <section>
        渲染组件 
      </section>
    
    </PageA>
  );
}





