/* 组件基础类  
  作用： 
  1 提供功能方法
  2 定义回调响应 
  3 ... 
*/

export default class Component {
  /* --------------------------------------------------------- 生命周期 */
  // 渲染-前0 
  constructor(props={}){ 
    this.props = props;
    // 
  }
  // 渲染-前1 
  render(){ }
  // 渲染-后 
  onMounted(){}
  // 卸载-前 
  onUnmount(){ }
  // 卸载-后 
  onUnmounted(){ }
  
  /* --------------------------------------------------------- 工具方法 */
  utils = { }
  
}
