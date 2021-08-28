
import "./todoList.less";

const {
  VaryValue,
  VaryList, 
} = window.$fd;

export default class TodoList {
  render (props){
    
    const inputVal$ = VaryValue('');
    const todoList$ = VaryList(
      [
        {
          text: '初始值001', 
          isDone: VaryValue(false),
        },
        {
          text: '初始值002', 
          isDone: VaryValue(false),
        },
        {
          text: '初始值003', 
          isDone: VaryValue(false),
        },
        {
          text: '初始值004', 
          isDone: VaryValue(false),
        },
        {
          text: '初始值005', 
          isDone: VaryValue(false),
        },
      ], 
      (itm, idx, id, list)=>{
        return (
          <div className="itm-wrap">
            <span onClick={()=>evts.updateTodoItm( id, itm )}> {itm.isDone} </span>
            <div >
              { itm.text }
            </div>
            <span onClick={()=>evts.removeTodoItm( id, itm.text )}>删除</span>
          </div>
        );
      }
    );
    const list1 = [
      // 1,
      // 2,
      4, 
    ]
    
    const evts = {
      addTodoItm: (evt)=>{
        console.log(evt);
        let newTodo = inputVal$.$$;
        // todoList$.$insert(( list )=>{
        //   return [
        //     list.length, 
        //     [ 
        //       {
        //         text: newTodo,
        //         isDone: VaryValue(false), 
        //       },
        //     ]
        //   ];
        // })
        todoList$.$push({
          text: newTodo,
          isDone: VaryValue(false), 
        })
        .then(()=>{
          inputVal$.set(()=>{
            return '';
          })
          console.log( todoList$ );
        })
      },
      removeTodoItm: (id, text )=>{
        console.log("000000000 ", id, text)
        todoList$.$remove( id )
        .then(()=>{
          // 
        })
      },
      updateTodoItm: (id, itm)=>{
        itm.isDone.set((val)=>{
          return !val;
        })
        .then(()=>{
          
          // console.log( JSON.stringify( todoList$.$$.map((itm,idx)=>{
          //   return {
          //     ...itm,
          //     isDone: itm.isDone.$$, 
          //   }
          // }), 2, 2 ));
        })
        
        // todoList$.$update(id, {
        //   ...itm, 
        //   isDone: !itm.isDone,
        // })
      },
    }
    
    return (
      <div className="TodoList">
        <div className="part1">
          <input value={inputVal$} placeholder="请输入代办事项" className="input" />
          <button onClick={evts.addTodoItm}>添加</button>
        </div>
        
        <div className="part2">
          { todoList$ }
        </div>
        
        <div> 
        </div>
        { list1 } 
        
      </div>
    );
  } 
}

