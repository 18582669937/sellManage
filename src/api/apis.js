import axios from 'axios'

const IP = "http://127.0.0.1:5000"
axios.defaults.baseURL = IP

/* 商品图片上传接口地址 */
export const ITEMS_IMG_UPLOAD = IP + '/goods/goods_img_upload'




/* 登录 */
export var login = (params) => axios.post('/users/checkLogin', params)
/* 验证token是否过期 */
export var checktoken = (token) => axios.get('/users/checktoken', { params: { token } })




/* 账号模块 */
/* 添加账号 */
export var accAdd = (params) => axios.post('/users/add', params)
/* 获取账号列表 */
export var accList = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })
/* 删除账号 */
export var accDelet = (id) => axios.get('/users/del', { params: { id } })
/* 批量删除 */
export var batDel = (ids) => axios.get('/users/batchdel', { params: { ids } })
/* 修改账号 */
export var editAcc = (params) => axios.post('/users/edit', params)
/* 检查旧密码是否正确 */
export var oldPwd = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })
/* 修改密码 */
export var editPwd = (params) => axios.post('/users/editpwd', params)
/* 获取账号（个人中心）信息 */
export var personal = (id) => axios.get('/users/accountinfo', { params: { id } })
// export var personal = (params) => axios.get('/users/accountinfo', { params: params })




/* 商品管理模块 */
/* 头像上传接口 */
export var upload = (id) => axios.post('/users/avatar_upload', { id })
/* 添加分类 */
export var addCate = (params) => axios.post('/goods/addcate', params)
/* 获取分类 */
export var getCate = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })
/* 删除分类 */
export var delCate = (id) => axios.get('/goods/delcate', { params: { id } })
/* 修改分类 */
export var editCate = (id, cateName, state) => axios.post('/goods/editcate', { id, cateName, state })
/* 获取商品列表 */
export var getList = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })
/* 删除商品 */
export var delGoods = (id) => axios.get('/goods/del', { params: { id } })
/* 商品添加 */
// export var addGoods = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })
export var addGoods = (params) => axios.post('/goods/add', params)
/* 查询所有分类名称 */
export var categories = () => axios.get('/goods/categories')
/* 17.商品图片上传接口 */
export var uploadGoods = () => axios.post('/goods/goods_img_upload')
/* 修改商品 */
export var editGoods = (params) => axios.post('/goods/edit', params)




/* 订单管理模块 */
/* 获取订单列表(带查询功能) */
export var orderList = (params) => axios.get('/order/list', { params })
// export var orderList = (currentPage, pageSize) => axios.get('/order/list', { params: { currentPage, pageSize } })
/* 查询 */
// export var search = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })
export var search = (params) => axios.get('/order/search', { params })
/* 获取订单详情 */
export var orderDetail = (id) => axios.get('/order/detail', { params: { id } })
/* 修改订单 */
export var editOrder = (params) => axios.post('/order/edit', params)




/* 获取店铺详情 */
export var shopDetail = () => axios.get('/shop/info')
/* 店铺图片接口地址 */
export const SHOP_UPLOAD = IP + '/shop/upload'
/* 根目录地址 */
export const UPLOAD_SHOP = IP + '/upload/shop/'

/* 店铺内容修改 */
export var editContent = (params) => axios.post('/shop/edit', params)


/* 首页报表 */
export var totalData = () => axios.get('/order/totaldata')
/* 订单报表接口 */
export var orderTotal = (params) => axios.get('/order/ordertotal', { params })