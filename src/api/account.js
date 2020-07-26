/* 
    封装用户ajax
*/
import req from '../utils/request';


// 登录
export function chelogin(params){
    return req.post('/users/checkLogin',params)
}

// 添加账号
export function addpwd(params){
    return req.post('/users/add',params)
}


//获取账号列表
export function acclist(params){
    return req.get('/users/list',params)
}

//单个删除
export function del(params){
    return req.get('/users/del',params)
}


//批量删除
export function alldel(params){
    return req.get('/users/batchdel',params)
}



//修改账号
export function edit(params){
    return req.post('/users/edit',params)
}

// 检测旧密码是否一致
export function checkoldpwd(params){
    return req.get('/users/checkoldpwd',params)
}



// 修改密碼
export function editpwd(params){
    return req.post('/users/editpwd',params)
}



// 个人中心
export function userinfo(params){
    return req.get('/users/info',params)
}


// 修改头像
export function avataredit(params){
    return req.get('/users/avataredit',params)
}