

export default function cpntRender(Klass, ...args){
  let instance = null;
  let renderNode = null;
  try {
    instance = new Klass(...args);
    // Features: 优先使用'render_',便于自定义继承 
    let renderFunc = instance.render_ || instance.render;
    renderNode = renderFunc.bind(instance)();
    instance.root._resolve(renderNode);
  } 
  catch (err) {
    console.error(err);
    throw err;
  } 
  
  return {
    context: instance,
    renderNode,
  };
} 

