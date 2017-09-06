<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">处理状态</span>

                <span slot="right" v-if="info.approvalStatus == 'UNKNOWN'" style="color: #e65966;" >未知</span>
                <span slot="right" v-if="info.approvalStatus == 'WAITSUBMIT'" style="color: #e65966;" >待提交</span>
                <span slot="right" v-if="info.approvalStatus == 'WAITAPPROVAL'" style="color: #e65966;" >待审批</span>
                <span slot="right" v-if="info.approvalStatus == 'ALREADYPASS'" style="color: #e65966;" >已通过</span>
                <span slot="right" v-if="info.approvalStatus == 'NOPASS'" style="color: #e65966;" >未通过</span>
                <span slot="right" v-if="info.approvalStatus == 'TERMINATION'" style="color: #e65966;" >已终止</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">活动名称</span>
                <input slot="right" v-model="info.communityTitle" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系人</span>
                <input slot="right" v-model="info.proprser" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号码</span>
                <input slot="right" readonly v-model="info.phone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">公司名称</span>
                <input slot="right" readonly v-model="info.companyName">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">职务</span>
                <input slot="right" readonly v-model="info.position">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">人数</span>
                <input slot="right" readonly v-model="info.num">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="备注">
            <yd-cell-item>
                <yd-textarea
                    style="text-align: left;font-size: 0.26rem; color: #24242c;"
                    slot="right"
                    maxlength="140"
                    :readonly="true"
                    v-html="info.describle">
                </yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script>
    import { getCommunityHistoryDetail } from '../../api/api'

    export default {
        created() {
            getCommunityHistoryDetail(this.$route.params.eventId)
                .then(res => {
                    if (res.body.code == 200) {
                        this.info = res.body.data
                    }
                })
                .catch(e => console.log(e))
        },
        data() {
            return {
                info: {},
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
