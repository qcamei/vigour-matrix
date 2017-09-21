<template>
    <div style="padding-bottom: 1.4rem">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">预定人姓名</span>
                <yd-input
                    slot="right"
                    ref="input0"
                    v-model="info.name"
                    required
                    placeholder="请输入预定人姓名"
                    :max="10"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">预定人手机</span>
                <yd-input
                    slot="right"
                    ref="input1"
                    type="number"
                    v-model="info.phone"
                    regex="mobile"
                    required
                    placeholder="请输入预定人手机号"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">选择会议室</span>
                <span class="a123" slot="right" @click="flag = true">{{info.resourceName}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">开始时间</span>
                <yd-datetime
                    v-model="info.startDateStr"
                    type="datetime"
                    slot="right"
                    :startYear="new Date().getFullYear()"
                    :startDate="startDate"
                    :startHour="9"
                    :endHour="20"
                ></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">结束时间</span>
                <yd-datetime
                    v-model="info.endDateStr"
                    type="datetime"
                    slot="right"
                    :startDate="info.startDateStr"
                    :startYear="new Date().getFullYear()"
                    :startHour="9"
                    :endHour="20"
                ></yd-datetime>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="详细描述">
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入详细描述" maxlength="140" ref="textarea"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <yd-actionsheet :items="roomList" v-model="flag"></yd-actionsheet>

        <div class="posts-btn-con">
            <yd-button @click.native="commit" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">提交
            </yd-button>
        </div>
    </div>
</template>
<script>
    import {ActionSheet} from 'vue-ydui/dist/lib.rem/actionsheet'
    import {DateTime} from 'vue-ydui/dist/lib.rem/datetime'
    import moment from 'moment'
    import {commitMeetingOrder} from '../../api/api'

    export default {
        created() {
            document.title = '添加会议室预定'
            this.roomList = decodeURIComponent(this.$route.params.roomList).split(',').map(item => {
                return {label: item, method: select => this.info.resourceName = select.label}
            })
        },
        computed: {
            startDate() {
                return moment().format('YYYY-MM-DD HH:mm')
            }
        },
        data() {
            return {
                info: {
                    name: '',
                    phone: '',
                    resourceName: this.$route.params.tierName,
                    startDateStr: moment().format('YYYY-MM-DD HH:mm'),
                    endDateStr: ''
                },
                flag: false,
                roomList: []
            }
        },
        components: {
            [ActionSheet.name]: ActionSheet,
            [DateTime.name]: DateTime
        },
        methods: {
            commit() {
                for (let i = 0; i < 2; i++) {
                    var validFlag = this.$refs['input' + i].valid
                    if (!validFlag) {
                        this.$dialog.toast({
                            mes: this.$refs['input' + i].errorMsg,
                            timeout: 800
                        });
                        return;
                    }
                }

                this.$dialog.loading.open('发送中')

                commitMeetingOrder({
                    resourceId: this.$route.params.id,
                    name: this.info.name,
                    phone: this.info.phone,
                    resourceName: this.info.resourceName,
                    reserveDate: moment(this.info.startDateStr).format('YYYY-MM-DD'),
                    startDateStr: moment(this.info.startDateStr).format('HH:mm'),
                    endDateStr: moment(this.info.endDateStr).format('HH:mm'),
                    enableStatus: 'ENABLE',
                    memo: this.$refs.textarea.$el.firstChild.value
                })
                    .then(res => {
                        if (res.body.code == 200) {
                            this.$dialog.loading.close()
                            return this.$dialog.toast({
                                mes: '预定成功',
                                timeout: 800,
                                callback: () => {
                                    this.$router.replace('/meeting/list')
                                }
                            })
                        } else {
                            this.$dialog.loading.close()
                            return this.$dialog.toast({
                                mes: res.body.message,
                                timeout: 800
                            })
                        }
                    })
                    .catch(e => console.log(e))
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #input-group
        input
            text-align right
            font-size .26rem
        span
            font-size .26rem
            color #24242c
        .a123
            height 100%
            line-height 1rem

    .posts-btn-con
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        z-index 10
        .posts-btn
            height .8rem
            margin 0
            font-size .28rem
</style>
