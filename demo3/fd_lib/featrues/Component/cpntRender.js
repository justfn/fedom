

export default function cpntRender(Klass, ...args){
  let instance = new Klass(...args);
  // Features: 优先使用'render_',便于自定义继承 
  let renderFunc = instance.render_ || instance.render;
  let renderNode = renderFunc.bind(instance)();
  
  return {
    instance,
    renderNode,
  };
} 

