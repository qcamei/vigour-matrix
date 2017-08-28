import Vue from 'vue'
import {baseURL} from './config'

const codeInfo = {
    parkCode: '170124153115071651',
    code: 'ohmqnwW5xCNCvpII_ira-TJqGSak'
}

/**
 * 会议室预定状态列表
 * @param date 当天日期 如：'2017-08-28' String
 */
export const getMeetingList = function (date) {
    return Vue.http.get(baseURL + '/wechat/resourceInfo/date', {
        params: {
            date,
            ...codeInfo
        }
    })
}

/**
 * 提交会议室预定
 * @param obj 预定信息 Object
 * @returns {*}
 */
export const commitMeetingOrder = function (obj) {
    return Vue.http.post(baseURL + '/wechat/mettingReserve', {
        ...codeInfo,
        ...obj
    })
}

export const orderHistoryList = function (obj) {
    return Vue.http.get(baseURL + '/wechat/mettingReserve', {
        params: {
            ...codeInfo,
            ...obj
        }
    })
}
