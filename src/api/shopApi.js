import Vue from 'vue'
import { baseURL } from './config'

// 调试接口时的登录
export const MockLogin = function () {
    return Vue.http.post(baseURL + '/park/admin/login', {
        username: 'P000005',
        password: '111111'
    })
}

// 获取首页banner图
export const getHomeBanner = function () {
    return Vue.http.get(baseURL + '/wechat/enterprise/bannerInfo/code?code=WECHAT_INDEX')
}

// 获取首页服务类型（查询所有）
export const getHomeType = function () {
    return Vue.http.get(baseURL + '/wechat/serviceType/valid')
}

// 获取首页商城活动
export const getShopActivity = function () {
    return Vue.http.get(baseURL + '/wechat/serviceActivity')
}

// 获取首页精选服务
export const getSpecialService = function () {
    return Vue.http.get(baseURL + '/wechat/serviceSift')
}

// 获取首页服务类型
export const getServiceType = function () {
    return Vue.http.get(baseURL + '/wechat/serviceType')
}

// 获取首页服务场景
export const getServiceStage = function () {
    return Vue.http.get(baseURL + '/wechat/serviceScenario')
}

// 获取首页园区自营
export const getParkSelfSale = function () {
    return Vue.http.get(baseURL + '/wechat/serviceProject/parkSelf/index')
}

// 分类获取服务场景icon列表
export const getStagesIcon = function () {
    return Vue.http.get(baseURL + '/wechat/serviceProject/parkSelf/index')
}

// 我的收货地址列表(全部)
export const getMyAddress = function () {
    return Vue.http.get(baseURL + '/wechat/addressInfo')
}

// 获取单条收货地址
export const getMyAddressSingle = function (id) {
    return Vue.http.get(baseURL + '/wechat/addressInfo/' + id)
}

// 设置成默认收货地址
export const setDefaultAddress = function (id) {
    return Vue.http.put(baseURL + '/wechat/addressInfo/default/' + id, {
        isDefault: true
    })
}

// 新增收货地址
export const addAddress = function (postInfo) {
    return Vue.http.post(baseURL + '/wechat/addressInfo', {
        ...postInfo
    })
}

// 编辑保存收货地址
export const editAddress = function (postInfo, id) {
    return Vue.http.put(baseURL + '/wechat/addressInfo/' + id, {
        ...postInfo
    })
}

// 获取开票信息列表
export const getInvoiceInfo = function () {
    return Vue.http.get(baseURL + '/wechat/invoiceInfo')
}

// 新增开票信息
export const addInvoiceInfo = function (postInfo) {
    return Vue.http.post(baseURL + '/wechat/invoiceInfo', {
        ...postInfo
    })
}

// 编辑开票信息
export const editInvoiceInfo = function (postInfo, id) {
    return Vue.http.put(baseURL + '/wechat/invoiceInfo/' + id, {
        ...postInfo
    })
}

// 获取单条发票信息
export const getInvoiceInfoSingle = function (id) {
    return Vue.http.get(baseURL + '/wechat/invoiceInfo/' + id)
}

// 设置默认开票信息
export const setDefaultInvoice = function (id) {
    return Vue.http.put(baseURL + '/wechat/invoiceInfo/default/' + id, {
        isDefault: true
    })
}

// 获取精选服务列表
export const getSpecialServiceList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/serviceSift' ,{
        params: { ...obj }
    })
}

// 获取园区自营列表
export const getParkSelfList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/serviceProject/parkSelf/list' ,{
        params: { ...obj }
    })
}

// 根据服务类型获取服务项目列表
export const getServiceListByType = function (typeId, obj) {
    return Vue.http.get(baseURL + '/wechat/serviceProject/type/' + typeId ,{
        params: { ...obj }
    })
}

// 根据服务场景获取服务项目列表
export const getServiceListByStage = function (typeId, obj) {
    return Vue.http.get(baseURL + '/wechat/serviceProject/scenario/' + typeId ,{
        params: { ...obj }
    })
}

// 获取我的收藏列表
export const getFavoriteList = function () {
    return Vue.http.get(baseURL + '/wechat/serviceCollect')
}

// 收藏服务
export const setFavorite = function (id) {
    return Vue.http.put(baseURL + '/wechat/serviceCollect/collect', {
        serviceProId: id
    })
}

// 取消收藏
export const removeFavorite = function (id) {
    return Vue.http.put(baseURL + '/wechat/serviceCollect/uncollect', {
        serviceProId: id
    })
}

// 获取单条服务详情
export const getServiceDetail = function (id) {
    return Vue.http.get(baseURL + '/wechat/serviceProject/' + id).catch(e => this.$dialog.toast({mes: e.statusText, timeout: 500}))
}

// 获取服务评论列表
export const getCommentList = function (id, obj) {
    return Vue.http.get(baseURL + '/wechat/serviceComment?serviceProId=' + id, {
        ...obj
    })
}

// 提交订单
export const postOrder = function (postInfo) {
    return Vue.http.post(baseURL + '/wechat/applyOrder/order', {
        ...postInfo
    })
}

// 获取我的订单列表
export const getMyOrderList = function () {
    return Vue.http.get(baseURL + '/wechat/applyOrder?applyOrderType=ORDER')
}

// 获取订单详情
export const getOrderdetail = function (id) {
    return Vue.http.get(baseURL + '/wechat/applyOrder/' + id)
}

// 取消未支付订单
export const cancelOrder = function (id) {
    return Vue.http.put(baseURL + '/wechat/applyOrder/order/cancel/' + id, {
        id
    })
}

// 确认订单
export const confirmOrder = function (id) {
    return Vue.http.put(baseURL + '/wechat/applyOrder/order/verify/' + id, {
        id
    })
}

// 提交申请单订单评论
export const commitComment = function (postInfo) {
    return Vue.http.post(baseURL + '/wechat/serviceComment', {
        ...postInfo
    })
}

// 获取申请单模板
export const getApplyTemplate = function (id) {
    return Vue.http.get(baseURL + '/commons/applyTemplate/' + id)
}

// 申请单提交
export const postApplyTemplate = function (postInfo) {
    return Vue.http.post(baseURL + '/wechat/applyOrder/apply', {
        ...postInfo
    })
}

// 获取我的申请列表
export const getApplyList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/applyOrder?applyOrderType=APPLY', {
        params: { ...obj }
    })
}

// 获取申请列表详情
export const getApplyDetail = function (id) {
    return Vue.http.get(baseURL + '/wechat/applyOrder/' + id)
}

// 申请单服务确认
export const applyServiceConfirm = function (id) {
    return Vue.http.put(baseURL + '/wechat/applyOrder/apply/verify/' + id, {
        id
    })
}

// 申请单取消申请
export const cancelApply = function (id) {
    return Vue.http.put(baseURL + '/wechat/applyOrder/apply/cancel/' + id, {
        id
    })
}
