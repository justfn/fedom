import "./cpntScpoe.less";
import Header from "../../../Parts/Header/Header.js";

function TestCpntScope(){
  let fdNode01 = <div className="fdNode01">fdNode01</div>
  
  return (
    <div className="TestCpntScope">
      <Header />
      <div className="part_Header"> aaaaaaaaaaaaaaaaa </div>
      <Header >
        <div className="part_Header"> bbbb </div>
      </Header>
      <div className=""> cccc </div>
    </div>
  );
} 
TestCpntScope.scopeName = 'aaa'
export default TestCpntScope;

