

export default function cpntRender(Klass, ...args){
  let instance = new Klass(...args);
  let renderFunc = instance.render_ || instance.render;
  let renderNode = renderFunc.bind(instance)();
  
  return {
    instance,
    renderNode,
  };
} 

