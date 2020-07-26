// 订单
// 获取订单列表
import req from '../utils/request';
export function orderlist(params){
    return req.get('/order/list',params)
}


// 获取订单列表
export function orderdetail(params){
    return req.get('/order/detail',params)
}

// 修改订单
export function orderedit(params){
    return req.post('/order/edit',params)
}

// 获取店铺信息
export function info(params){
    return req.get('/shop/info',params)
}

// 修改店铺信息
export function shopedit(params){
    return req.post('/shop/shopedit',params)
}