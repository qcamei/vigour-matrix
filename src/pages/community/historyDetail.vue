<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">处理状态</span>
                <input slot="right" v-model="info.status" style="color: #e65966;" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">活动名称</span>
                <input slot="right" v-model="info.title" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系人</span>
                <input slot="right" v-model="info.contact" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号码</span>
                <input slot="right" readonly v-model="info.phone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">公司名称</span>
                <input slot="right" readonly v-model="info.company">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">职务</span>
                <input slot="right" readonly v-model="info.job">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">人数</span>
                <input slot="right" readonly v-model="info.count">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="备注">
            <yd-cell-item>
                <yd-textarea
                    style="text-align: left;font-size: 0.26rem; color: #24242c;"
                    slot="right"
                    maxlength="140"
                    :readonly="true"
                    v-html="info.detail">
                </yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: {
                    status: '待处理',
                    title: '上海秋季全程马拉松赛上海秋季全程马拉松赛上海秋季全程',
                    contact: '李四',
                    phone: '186-2938-4099',
                    company: '上海市经纬文化有限公司',
                    job: '总经理',
                    count: '55',
                    detail: '<p> 竞赛日期及地点\n' +
                    '（一）比赛时间：2016年10月30日（星期日）7:00；\n' +
                    '（二）起点：外滩金牛广场；\n' +
                    '（三）马拉松、半程马拉松终点：上海体育场；\n' +
                    '（四）10公里跑终点：复兴公园；\n' +
                    '（五）健身跑终点：上海展览中心；\n' +
                    '\n</p>'
                },
                imgUrls: []
            }
        },
        components: {},
        methods: {

        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #post-con
        padding-bottom 1.4rem
        #input-group
            input
                text-align right
                font-size .26rem
                color #24242c
                width 5.2rem
            span
                font-size .26rem
                color #999
</style>
