import "./appHome.less";
import LayoutA from "../../../Parts/LayoutA/LayoutA.js";
import Header from "../../../Parts/Header/Header.js";

const {
  VaryValue,
} = window.$fd;


export default class AppHome {
  constructor(arg){ 
  }
  render(props){
    
    
    
    return (
      <LayoutA>
        <Header name={'应用首页'} />
      
      </LayoutA>
    );
  }
}


