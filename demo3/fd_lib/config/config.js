


export default {
  orgin_elements: [
    'div',
    'span',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'section',
    'header',
    'footer',
    'actile',
    'form',
    'input',
    'radio',
    'select',
    'ul',
    'li',
    'hr',
    'img',
    'video',
    'audio',
    'canvas',
  ],
  tag_types: {
    // 原生标签
    origin: 'origin_tag',
    // 函数组件 
    function: 'function_tag', 
    // 类组件 
    component: 'component_tag',
  },
  child_types: {
    // 文本值 [包含数值/空值,空值为''] 
    text: 'text_child',
    // 节点值 
    node: 'node_child',
    // 数组
    list: 'list_child',
  },
  
  
};

