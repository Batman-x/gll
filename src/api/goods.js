import req from '../utils/request';


// 渲染商品列表
export function goodslist(params){
    return req.get('/goods/list',params)
}


// 删除商品
export function goodsdel(params){
    return req.get('/goods/del',params)
}


// 修改商品
export function goodsedit(params){
    return req.post('/goods/edit',params)
}


// 添加商品
export function goodsadd(params){
    return req.post('/goods/add',params)
}


// 获取分类名称
export function categories(params){
    return req.get('/goods/categories',params)
}

// 获取分类
export function catelist(params){
    return req.get('/goods/catelist',params)
}


// 编辑分类
export function editcate(params){
    return req.post('/goods/editcate',params)
}


//删除分类分类
export function delcate(params){
    return req.get('/goods/delcate',params)
}


//添加分类
export function addcate(params){
    return req.post('/goods/addcate',params)
}