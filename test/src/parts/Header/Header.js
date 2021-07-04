
import "./Header.less";


const {
  VaryValue,
} = window.$fd;

export default function Header(props, context){
  // console.log(' Header --');
  let klass = props.className ?? '';
  context.onUnmount = (...args)=>{
    console.log( ' Header unmount ', args);
  }
  
  context.methods = {
    alert(){
      console.log('header alert!')
    }
  }
  
  
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


