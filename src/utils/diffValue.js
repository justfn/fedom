
const msg_todo_err = '未知的diff错误';

export default function diffValue(pre, nxt){
  try {
    // let isSame = JSON.stringify(pre)===JSON.stringify(nxt);
    // return isSame;
    return pre===nxt;
  } 
  catch (err) {
    console.log(msg_todo_err, err);
    return false;
  }
} 
