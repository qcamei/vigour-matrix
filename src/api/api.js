import Vue from 'vue'
import { baseURL } from './config'

// const codeInfo = {
//     parkCode: '170124153115071651',
//     code: 'ohmqnwW5xCNCvpII_ira-TJqGSak'
// }

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
 * @param obj
 * @returns {*} Object {cellphone: '', phoneCode: '', parkCode: ''}
 */
export const justBindPhone = function (obj) {
    return Vue.http.post(baseURL + '/wechat/phoneCode/binding', {
        ...obj
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
