
import "./Header.less";


const {
  VaryValue,
} = window.$fd;

export default function Header(props, context){
  // console.log(' Header --');
  let klass = props.class ?? '';
  context.onUnmount((...args)=>{
    console.log( ' Header unmount ', args);
  })
  return (
    <h1 class={['part_Header', klass ]}> 
      { props.name }
      <br />
      { '****************' }
      <br />
      { props.children }
    </h1>
  );
}


