
const {
  Component,
} = window.$fd;



class PageB extends Component {
  constructor(props){
    super(props);
    
    props.xx.watch(this.propsXxxChange)
  }
  propsXxxChange = (pre, now)=>{ }
  onMounted(){}
  onUnmount(){}
  onUnmounted(){}
  
  
  render(){
    setTimeout(this.mounted)
    
    return (
      <div class="pageB">
      
      </div>
    );
  }
}
export default PageB;

