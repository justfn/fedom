

export default function diffValue(pre, nxt){
  try {
    // let isSame = JSON.stringify(pre)===JSON.stringify(nxt);
    // console.log( isSame, pre, nxt );
    // return isSame;
    return pre===nxt;
  } 
  catch (err) {
    console.log( 'todo: ', err );
  }
} 
