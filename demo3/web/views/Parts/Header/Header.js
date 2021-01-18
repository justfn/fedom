import { useVary, } from "../../../../fd_lib/index.js";

import "./Header.less";

export default function Header(props, context){
  let klass = props.class ?? '';
  return (
    <h1 class={['part_Header', klass ]}> 
      { props.name }
    </h1>
  );
}


