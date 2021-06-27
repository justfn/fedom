import LayoutA from "../../../parts/LayoutA/LayoutA.js";
import Header from "../../../parts/Header/Header.js";
import "./other.less";


const {
  VaryValue,
  render, 
} = window.$fd;

export default function(props, context){
  
  
  
  return (
    <LayoutA>
      <Header name={'测试首页'} />
    
    </LayoutA>
  );
}
