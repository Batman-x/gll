/* 
    封装正则
*/
// 验证用户名    //用户名正则，中文、英文、数字、下划线、1-16个字符
export  const ACC_LOGIN = /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{1,16}$/ ;


//密码强度正则，中文、英文、数字、下划线、4-16个字符
export const ACC_PWD = /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/ ;
