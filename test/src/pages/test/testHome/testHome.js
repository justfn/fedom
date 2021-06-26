import PageA from "../../../parts/PageA/PageA.js";
import Header from "../../../parts/Header/Header.js";
import "./testHome.less";


const {
  VaryValue,
  render, 
} = window.$fd;

export default function(props, context){
  
  
  
  return (
    <PageA>
      <Header name={'测试首页'} />
    
    </PageA>
  );
}
