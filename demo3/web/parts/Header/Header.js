
import "./Header.less";


const {
  VaryValue,
} = window.$fd;

export default function Header(props, context){
  let klass = props.class ?? '';
  return (
    <h1 class={['part_Header', klass ]}> 
      { props.name }
    </h1>
  );
}


