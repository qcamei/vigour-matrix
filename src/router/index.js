import Vue from 'vue'
import Router from 'vue-router'
import {Loading} from 'vue-ydui/dist/lib.rem/dialog'

import Test from '../pages/test.vue'
import Report from '../pages/repair/report.vue'
import Community from '../pages/community/community.vue'
import Meeting from '../pages/meeting/meeting.vue'
import Bill from '../pages/bill/bill.vue'

// 登录
const Login = resolve => {
    Loading.open('加载中...')
    require.ensure(['../pages/login/login.vue'], () => {
        resolve(require('../pages/login/login.vue'))
        Loading.close()
    }, 'login-group')
}
const ChoosePark = resolve => {
    Loading.open('加载中...')
    require.ensure(['../pages/login/choosePark.vue'], () => {
        resolve(require('../pages/login/choosePark.vue'))
        Loading.close()
    }, 'login-group')
}

// 维修申报
const ReportHistory = resolve => {
    Loading.open('加载中...')
    require.ensure(['../pages/repair/reportHistory.vue'], () => {
        resolve(require('../pages/repair/reportHistory.vue'))
        Loading.close()
    }, 'report-group')
}
const Posts = resolve => require.ensure(['../pages/repair/posts.vue'], () => resolve(require('../pages/repair/posts.vue')), 'report-group')
const Pending = resolve => require.ensure(['../pages/repair/pending.vue'], () => resolve(require('../pages/repair/pending.vue')), 'report-group')
const Closed = resolve => require.ensure(['../pages/repair/closed.vue'], () => resolve(require('../pages/repair/closed.vue')), 'report-group')
const Coment = resolve => require.ensure(['../pages/repair/coment.vue'], () => resolve(require('../pages/repair/coment.vue')), 'report-group')

// 社群活动
const CommunityList = resolve => {
    Loading.open('加载中...')
    require.ensure(['../pages/community/list.vue'], () => {
        resolve(require('../pages/community/list.vue'))
        Loading.close()
    }, 'community-group')
}
const CommunityDetail = resolve => require.ensure(['../pages/community/detail.vue'], () => resolve(require('../pages/community/detail.vue')), 'community-group')
const CommunityApply = resolve => require.ensure(['../pages/community/apply.vue'], () => resolve(require('../pages/community/apply.vue')), 'community-group')
const CommunityHistory = resolve => require.ensure(['../pages/community/eventHistory.vue'], () => resolve(require('../pages/community/eventHistory.vue')), 'community-group')
const CommunityHistoryDetail = resolve => require.ensure(['../pages/community/historyDetail.vue'], () => resolve(require('../pages/community/historyDetail.vue')), 'community-group')

// 会议室预订
const MeetingList = resolve => {
    Loading.open('加载中...')
    require.ensure(['../pages/meeting/meetingList.vue'], () => {
        resolve(require('../pages/meeting/meetingList.vue'))
        Loading.close()
    }, 'meeting-group')
}
const MeetingAdd = resolve => require.ensure(['../pages/meeting/add.vue'], () => resolve(require('../pages/meeting/add.vue')), 'meeting-group')
const MeetingRoom = resolve => require.ensure(['../pages/meeting/roomDetail.vue'], () => resolve(require('../pages/meeting/roomDetail.vue')), 'meeting-group')
const MeetingMyOrder = resolve => require.ensure(['../pages/meeting/myOrder.vue'], () => resolve(require('../pages/meeting/myOrder.vue')), 'meeting-group')
const MeetingMyOrderDetail = resolve => require.ensure(['../pages/meeting/myOrderDetail.vue'], () => resolve(require('../pages/meeting/myOrderDetail.vue')), 'meeting-group')

// 企业账单
const BillList = resolve => {
    Loading.open('加载中...')
    require.ensure(['../pages/bill/list.vue'], () => {
        resolve(require('../pages/bill/list.vue'))
        Loading.close()
    }, 'bill-group')
}
const BillListDetail = resolve => require.ensure(['../pages/bill/detail.vue'], () => resolve(require('../pages/bill/detail.vue')), 'bill-group')
const BillListDetailConfirm = resolve => require.ensure(['../pages/bill/confirm.vue'], () => resolve(require('../pages/bill/confirm.vue')), 'bill-group')

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            component: Test,
            meta: {title: '主页测试菜单'}
            // redirect: '/login'
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/choose-park',
            component: ChoosePark,
            meta: {
                title: '绑定用户'
            }
        },
        {
            path: '/report',
            component: Report,
            meta: {
                title: '维修申报'
            },
            children: [
                {
                    path: 'history',
                    component: ReportHistory,
                    meta: {
                        title: '维修申报记录',
                        addReport: true,
                        backIcon: false
                    }
                },
                {
                    path: 'posts',
                    component: Posts,
                    meta: {
                        title: '新建维修申报',
                        backIcon: true
                    }
                },
                {
                    path: 'pending/:id',
                    component: Pending,
                    meta: {
                        title: '维修申报详情',
                        backIcon: true
                    }
                },
                {
                    path: 'closed/:id',
                    component: Closed,
                    meta: {
                        title: '维修申报查看',
                        backIcon: true
                    }
                },
                {
                    path: 'coment/:id',
                    component: Coment,
                    meta: {
                        title: '维修申报详情',
                        backIcon: true
                    }
                }
            ]
        },
        {
            path: '/community',
            component: Community,
            meta: {
                title: '社群活动'
            },
            children: [
                {
                    path: 'list',
                    component: CommunityList,
                    meta: {
                        title: '社群活动',
                        hasHistory: true,
                        backIcon: false
                    }
                },
                {
                    path: 'detail/:eventId/',
                    component: CommunityDetail,
                    meta: {
                        title: '社群活动详情',
                        backIcon: true
                    }
                },
                {
                    path: 'detail/:eventId/apply',
                    component: CommunityApply,
                    meta: {
                        title: '参加活动申请',
                        backIcon: true
                    }
                },
                {
                    path: 'history',
                    component: CommunityHistory,
                    meta: {
                        title: '参加活动纪录',
                        backIcon: true
                    }
                },
                {
                    path: 'history/detail/:eventId',
                    component: CommunityHistoryDetail,
                    meta: {
                        title: '活动申请详情',
                        backIcon: true
                    },
                }
            ]
        },
        {
            path: '/meeting',
            component: Meeting,
            meta: {
                title: '会议室列表'
            },
            children: [
                {
                    path: 'list',
                    component: MeetingList,
                    meta: {
                        title: '会议室列表',
                        hasOrder: true,
                        backIcon: false
                    },
                },
                {
                    path: 'room/:id',
                    component: MeetingRoom,
                    meta: {
                        title: '会议室信息',
                        backIcon: true
                    },
                },
                {
                    path: 'add/:id/:tierName/:roomList',
                    component: MeetingAdd,
                    name: 'meetingAdd',
                    meta: {
                        title: '添加会议室预定',
                        backIcon: true
                    },
                },
                {
                    path: 'myorder',
                    component: MeetingMyOrder,
                    meta: {
                        title: '我的预定',
                        backIcon: true
                    },
                },
                {
                    path: 'myorder/detail/:orderId',
                    component: MeetingMyOrderDetail,
                    meta: {
                        title: '会议室预定详情',
                        backIcon: true
                    },
                }
            ]
        },
        {
            path: '/bill',
            component: Bill,
            meta: {
                title: '企业账单'
            },
            children: [
                {
                    path: 'list',
                    component: BillList,
                    meta: {
                        title: '企业账单',
                        backIcon: false
                    },
                },
                {
                    path: 'detail/:billId',
                    component: BillListDetail,
                    meta: {
                        title: '账单详情',
                        backIcon: true
                    },
                },
                {
                    path: 'detail/:billId/confirm',
                    component: BillListDetailConfirm,
                    meta: {
                        title: '账单支付确认',
                        backIcon: true
                    },
                },

            ]
        }
    ]
})
