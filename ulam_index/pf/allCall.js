function isTel(val) {
  if(/^1[3456789]\d{9}$/.test(val)){
    return true;
  }
  return false;
}
//检查是否为验证码
function isYma (val) {
  if( /^\d{4}$/.test(val) ){
    return true;
  }
  return false;
}
export {
  isTel,isYma
}
