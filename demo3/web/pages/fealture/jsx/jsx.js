
import "./jsx.less";
import PageA from "../../../Parts/PageA/PageA.js";
import Header from "../../../Parts/Header/Header.js";
import Section from "../../../Parts/Section/Section.js";
import CptA from "./CptA.js";


const {
  VaryValue,
} = window.$fd;

export default function pageJSX(props,context){
  
  
  
  return (
    <PageA>
      <Header name={'特性-JSX能力'} />
      
      <Section title="渲染文本">
        { '一段文本' }
        又一段文本
        { /* 注释，默认什么都不会渲染 */ }
        // 双斜杠不会作为注释
      </Section>
      
      <Section title="渲染html">
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
      </Section>
      
      <Section title="渲染组件">
        <CptA name="名称2" />
        <CptA name="名称1" />
      </Section>
      
    </PageA>
  );
}





