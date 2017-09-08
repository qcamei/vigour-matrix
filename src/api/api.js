import Vue from 'vue'
import { baseURL } from './config'

/**
 * 发送验证码
 * @param cellPhone 手机号 String
 * @returns {*}
 */
export const sendValidCode = function (cellPhone) {
    return Vue.http.post(baseURL + '/wechat/phoneCode/single', {
        cellPhone
    })
}

/**
 * 手机号验证码登录
 * @param obj Object {cellphone: '', phoneCode: ''}
 * @returns {*}
 */
export const toLogin = function (obj) {
    return Vue.http.post(baseURL + '/wechat/phoneCode/check', {
        ...obj
    })
}

/**
 * 手机号没有绑定过园区，直接绑定当前园区后登录
 * @param obj Object {cellphone: '', phoneCode: '', parkCode: ''}
 * @returns {*}
 */
export const justBindPhone = function (obj) {
    return Vue.http.post(baseURL + '/wechat/phoneCode/binding', {
        ...obj
    })
}

/**
 * 选择园区后登录
 * @param tempTokenKey String "1670686445"
 */
export const chooseAndBind = function (tempTokenKey) {
    return Vue.http.get(baseURL + '/wechat/phoneCode/binding', {
        params: {
            tempTokenKey
        }
    })
}

/**
 * 会议室预定状态列表
 * @param date 当天日期 如：'2017-08-28' String
 * @returns {*}
 */
export const getMeetingList = function (date) {
    return Vue.http.get(baseURL + '/wechat/resourceInfo/date', {
        params: {
            date,
        }
    })
}

/**
 * 提交会议室预定
 * @param obj 预定信息 Object {}
 * @returns {*}
 */
export const commitMeetingOrder = function (obj) {
    return Vue.http.post(baseURL + '/wechat/mettingReserve', {
        ...obj
    })
}

/**
 * 我的会议室预定历史列表
 * @param obj Object {page: 1, limit: 10}
 * @returns {*}
 */
export const orderHistoryList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/mettingReserve', {
        params: {
            ...obj
        }
    })
}

/**
 * 取消预定
 * @param id
 */
export const cancelMeetingOrder = function (id) {
    return Vue.http.put(baseURL + '/wechat/mettingReserve/cancle/' + id)
}

/**
 * 维修申报历史
 * @param obj Object {page: 1, limit: 10}
 */
export const getReportList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/task', {
        params: {
            ...obj
        }
    })
}

/**
 * 申报列表详情
 * @param id 申报单号id
 */
export const getReportDetail = function (id) {
    return Vue.http.get(baseURL + '/wechat/task/' + id)
}

/**
 * 待评价申报提交评论
 * @param obj {commentGrade: 'GOOD', commentContent: ''}
 * @param id
 * @returns {*}
 */
export const makeComment = function (obj, id) {
    return Vue.http.put(baseURL + '/wechat/task/comment/' + id, {
        ...obj
    })
}

/**
 * 新建维修申报
 * @param obj
 * @returns {*}
 */
export const newPostReport = function (obj) {
    return Vue.http.post(baseURL + '/wechat/task' ,{
        ...obj
    })
}

/**
 * 社群活动列表
 * @param obj Object {page: 1, limit: 5}
 * @returns {*}
 */
export const getCommunityList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/community', {
        params: {
            ...obj
        }
    })
}

/**
 * 社群活动申请历史纪录列表
 * @param obj Object {page: 1, limit: 10}
 * @returns {*}
 */
export const getCommunityHistoryList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/communityApply', {
        params: {
            ...obj
        }
    })
}

/**
 * 社群活动详情
 * @param id 活动id
 */
export const getCommunityDetail = function (id) {
    return Vue.http.get(baseURL + '/wechat/community/' + id)
}

/**
 * 社群活动提交活动申请
 * @param obj
 * @returns {*}
 */
export const commitCommunityPosts = function (obj) {
    return Vue.http.post(baseURL + '/wechat/communityApply', {
        ...obj
    })
}

/**
 * 社群活动我的历史申请活动详情
 * @param id
 */
export const getCommunityHistoryDetail = function (id) {
    return Vue.http.get(baseURL + '/wechat/communityApply/' + id)
}

/**
 * 企业账单列表
 * @param obj {page: 1, limit: 10}
 */
export const getBillList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/billInfo/pushed', {
        params: {
            ...obj
        }
    })
}

/**
 * 企业账单详情
 * @param id
 */
export const getBillDetail = function (id) {
    return Vue.http.get(baseURL + '/wechat/billInfo/detail/' + id)
}

/**
 * 账单支付确认
 * @param id
 * @param obj
 * @returns {*}
 */
export const commitPayCertificate = function (id, obj) {
    return Vue.http.put(baseURL + '/wechat/billInfo/confirm/' + id, {
        ...obj
    })
}

/**
 * 获取当前用户手机号对应的企业账号
 * @returns {*}
 */
export const getUsersCompany = function () {
    return Vue.http.get(baseURL + '/wechat/valid/user')
}
