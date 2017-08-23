<template>
    <div>
        <yd-tab>
            <yd-tab-panel v-for="(day, idx) in infos" :key="idx" :label="day.date">
                <div class="meeting-item" v-for="(roomItem, index) in day.room" @click="roomDetail(roomItem.roomId)">
                    <div class="title">{{ roomItem.roomName }}</div>
                    <div class="desc">{{ roomItem.describe }}</div>
                    <div class="meetbar-con">
                        <div class="meetbar-item" v-for="(colorItem, colorIdx) in roomItem.roomStatus">
                            <div v-if="colorItem === 'busy'" class="color" style="background-color: #89D6D4"></div>
                            <div v-else-if="colorItem === 'mine'" class="color" style="background-color: #F8E71C"></div>
                            <div v-else="colorItem === ''" class="color" ></div>
                            <div class="time">{{ ('0' + (colorIdx.slice(5))).slice(-2) }}</div>
                        </div>
                    </div>
                    <yd-button
                        @click.native.stop="orderMeet(roomItem.roomId)"
                        class="order-btn" type="hollow"
                        bgcolor="#fff"
                        color="#00A7A3"
                        style="border: 1px solid #00A7A3"
                    >预定
                    </yd-button>
                </div>
            </yd-tab-panel>
        </yd-tab>
    </div>
</template>
<script>
    import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';

    export default {
        data() {
            return {
                infos: [
                    {
                        date: '8月23日',
                        room: [
                            {
                                roomId: 1,
                                roomName: '会议室一',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: 'busy',
                                    clock12: 'busy',
                                    clock13: 'busy',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: 'mine',
                                    clock17: 'mine',
                                    clock18: '',
                                    clock19: '',
                                    clock20: '',
                                    clock21: ''
                                }
                            },
                            {
                                roomId: 2,
                                roomName: '会议室二',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: 'busy',
                                    clock12: 'busy',
                                    clock13: 'busy',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: '',
                                    clock17: '',
                                    clock18: 'mine',
                                    clock19: '',
                                    clock20: 'mine',
                                    clock21: ''
                                }
                            }
                        ]
                    },
                    {
                        date: '8月24日',
                        room: [
                            {
                                roomId: 1,
                                roomName: '会议室一',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: '',
                                    clock12: 'busy',
                                    clock13: '',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: 'mine',
                                    clock17: 'mine',
                                    clock18: '',
                                    clock19: '',
                                    clock20: '',
                                    clock21: ''
                                }
                            }
                        ]
                    },
                    {
                        date: '8月25日',
                        room: [
                            {
                                roomId: 1,
                                roomName: '会议室一',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: 'busy',
                                    clock12: 'busy',
                                    clock13: 'busy',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: 'mine',
                                    clock17: 'mine',
                                    clock18: '',
                                    clock19: '',
                                    clock20: '',
                                    clock21: ''
                                }
                            },
                            {
                                roomId: 2,
                                roomName: '会议室二',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: 'busy',
                                    clock12: 'busy',
                                    clock13: 'busy',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: '',
                                    clock17: '',
                                    clock18: 'mine',
                                    clock19: '',
                                    clock20: 'mine',
                                    clock21: ''
                                }
                            }
                        ]
                    },
                    {
                        date: '8月26日',
                        room: [
                            {
                                roomId: 1,
                                roomName: '会议室一',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: '',
                                    clock12: 'busy',
                                    clock13: '',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: 'mine',
                                    clock17: 'mine',
                                    clock18: '',
                                    clock19: '',
                                    clock20: '',
                                    clock21: ''
                                }
                            }
                        ]
                    },
                    {
                        date: '8月27日',
                        room: [
                            {
                                roomId: 1,
                                roomName: '会议室一',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: 'busy',
                                    clock12: 'busy',
                                    clock13: 'busy',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: 'mine',
                                    clock17: 'mine',
                                    clock18: '',
                                    clock19: '',
                                    clock20: '',
                                    clock21: ''
                                }
                            },
                            {
                                roomId: 2,
                                roomName: '会议室二',
                                describe: '可容纳20人，并提供八爪鱼',
                                roomStatus: {
                                    clock9: '',
                                    clock10: '',
                                    clock11: 'busy',
                                    clock12: 'busy',
                                    clock13: 'busy',
                                    clock14: 'busy',
                                    clock15: '',
                                    clock16: '',
                                    clock17: '',
                                    clock18: 'mine',
                                    clock19: '',
                                    clock20: 'mine',
                                    clock21: ''
                                }
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            [Tab.name]: Tab,
            [TabPanel.name]: TabPanel
        },
        methods: {
            orderMeet(roomId) {
                this.$router.push(`/meeting/add/${roomId}`)
            },
            roomDetail(roomId) {
                this.$router.push(`/meeting/room/${roomId}`)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .meeting-item
        position relative
        width 100%
        padding .2rem
        background-color #fff
        display flex
        flex-direction column
        margin-bottom .2rem
        .title
            font-size .28rem
            color: #24242c
            line-height .4rem
            width 5rem
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
        .desc
            font-size .24rem
            color: #999
            line-height .34rem
            margin-top .08rem
        .meetbar-con
            display flex
            justify-content space-between
            margin-top .18rem
            .meetbar-item
                display flex
                flex-direction column
                width .4rem
                justify-content space-between
                .color
                    width .4rem
                    height .54rem
                    background-color #e5f6f5
                .time
                    font-size .2rem
                    color #999
                    text-align center
                    margin-top .06rem
        .order-btn
            width 1.2rem
            height .52rem
            position: absolute
            top .2rem
            right .2rem
</style>
