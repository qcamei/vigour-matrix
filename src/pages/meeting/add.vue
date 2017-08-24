<template>
    <div style="padding-bottom: 1.4rem">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">预定人姓名</span>
                <yd-input
                    slot="right"
                    ref="input0"
                    v-model="info.contact"
                    required
                    placeholder="请输入预定人姓名"
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
                <span class="a123" slot="right" @click="flag = true">{{info.roomName}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">开始时间</span>
                <yd-datetime
                    v-model="info.startTime"
                    type="datetime"
                    slot="right"
                    :startYear="new Date().getFullYear()"
                    :startHour="9"
                    :endHour="21"
                ></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">结束时间</span>
                <yd-datetime
                    v-model="info.endTime"
                    type="datetime"
                    slot="right"
                    :startDate="info.startTime"
                    :startYear="2017"
                    :startHour="9"
                    :endHour="21"
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
    import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';

    export default {
        data() {
            return {
                info: {
                    contact: '',
                    phone: '',
                    roomName: '会议室1',
                    startTime: '',
                    endTime: ''
                },
                flag: false,
                roomList: [
                    {
                        label: '会议室1',
                        method: (select) => {
                            this.info.roomName = select.label
                        }
                    },
                    {
                        label: '会议室2',
                        method: (select) => {
                            this.info.roomName = select.label
                        }
                    },
                    {
                        label: '会议室3',
                        method: (select) => {
                            this.info.roomName = select.label
                        }
                    }
                ]
            }
        },
        components: {
            [ActionSheet.name]: ActionSheet,
            [DateTime.name]: DateTime
        },
        methods: {
            commit() {

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
