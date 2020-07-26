// 报表的所有数据
import req from '../utils/request'; 

// 首页报表
export function gettaotaldata(params){
    return req.get('/order/totaldata',params)
}

// 订单报表
export function getordertotal(params){
    return req.get('/order/ordertotal',params)
}