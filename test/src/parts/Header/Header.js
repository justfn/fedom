
import "./Header.less";


const {
  VaryValue,
} = window.$fd;

export default class Header {
  constructor(props){ 
  }
  
  onUnmount = (...args)=>{
    console.log( ' Header unmount ', args);
  }
  methods = {
    alert(){
      console.log('header alert!')
    }
  }
  render(props){
    // console.log(' Header --');
    let klass = props.className ?? '';
    
    
    return (
      <h1 data-flg='Header' className={['part_Header', klass ]}> 
        <div>
          1 { props.name }
        </div>
        <div>
          2 { '****************' }
        </div>
        <div>
          3 { props.children }
        </div>
      </h1>
    );
  }

}



