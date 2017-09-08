<template>
    <div>
        <yd-tab v-if="totalInfo && totalInfo.length === 5">
            <yd-tab-panel v-for="(day, idx) in totalInfo" :key="idx" :label="day.date">
                <div class="meeting-item" v-for="(roomItem, index) in day.room" @click="roomDetail(roomItem.id)">
                    <div class="title">{{ roomItem.name }}</div>
                    <div class="desc">{{ roomItem.description }}</div>
                    <div class="meetbar-con">
                        <div class="even-bar">
                            <span style="left: 8.33%">10:00</span>
                            <span style="left: 25%">12:00</span>
                            <span style="left: 41.66%">14:00</span>
                            <span style="left: 58.33%">16:00</span>
                            <span style="left: 75%">18:00</span>
                            <span style="left: 91.66%">20:00</span>
                        </div>

                        <div class="timeline">
                            <div
                                v-if="roomItem.reserveVos.length"
                                v-for="colorItem in roomItem.reserveVos"
                                class="color-block"
                                :style="{
                                    width: (colorItem.endNum - colorItem.startNum) / 720 * 100 + '%',
                                    left: (colorItem.startNum / 720) * 100 + '%',
                                    backgroundColor: colorItem.me ? myColor : otherColor
                                }"
                            ></div>
                            <!--width: 20%; background-color: #89D6D4; left: 20%-->
                            <span class="shortline" style="left: 0"></span>
                            <span class="shortline" v-for="n in 12" :style="{left: n * (100/12) + '%'}"></span>
                        </div>
                        <div class="odd-bar">
                            <span style="left: 0">09:00</span>
                            <span style="left: 16.66%">11:00</span>
                            <span style="left: 33.33%">13:00</span>
                            <span style="left: 50%">15:00</span>
                            <span style="left: 66.66%">17:00</span>
                            <span style="left: 83.33%">19:00</span>
                            <span style="left: 100%">21:00</span>
                        </div>
                    </div>
                    <yd-button
                        @click.native.stop="orderMeet(roomItem)"
                        class="order-btn" type="hollow"
                        bgcolor="#fff"
                        color="#00A7A3"
                        style="border: 1px solid #00A7A3"
                    >预定
                    </yd-button>
                </div>
            </yd-tab-panel>
        </yd-tab>

        <router-link class="max-btn-order" to="/meeting/myorder">
            <i class="max max-order"></i>
        </router-link>
    </div>
</template>
<script>
    import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab'
    import moment from 'moment'
    import {getMeetingList} from '../../api/api'

    export default {
        watch: {
            infos: {
                handler(cur, old) {
                    this.totalInfo = cur
                },
                deep: true
            }
        },
        created() {
            document.title = '会议室列表'
            this.$dialog.loading.open('加载中...')
            getMeetingList(moment().format('YYYY-MM-DD'))
                .then(res => {
                    res.body.data.forEach(item => this.roomList.push(item.name))
                    return this.infos.push({
                        date: moment().format('MM月DD日'),
                        room: res.body.data,
                    })
                })
                .then(() => this.getOffsetDate(1))
                .then(() => this.getOffsetDate(2))
                .then(() => this.getOffsetDate(3))
                .then(() => this.getOffsetDate(4))
                .then(() => this.$dialog.loading.close())
                .catch(e => console.log(e))
        },
        data() {
            return {
                infos: [],
                totalInfo: null,
                otherColor: '#89D6D4',
                myColor: '#F8E71C',
                roomList: []
            }
        },
        components: {
            [Tab.name]: Tab,
            [TabPanel.name]: TabPanel
        },
        methods: {
            orderMeet(roomItem) {
                this.$router.push({
                    name: 'meetingAdd', params: {
                        id: roomItem.id,
                        tierName: roomItem.name,
                        roomList: encodeURIComponent(this.roomList)
                    }
                })
            },
            roomDetail(roomId) {
                this.$router.push(`/meeting/room/${roomId}`)
            },
            getOffsetDate(offsetDay) {
                return getMeetingList(moment().add(offsetDay, 'days').format('YYYY-MM-DD')).then(res => {
                    this.infos.push({
                        date: moment().add(offsetDay, 'days').format('MM月DD日'),
                        room: res.body.data,
                    })
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .max-btn-order
        display flex
        align-items center
        justify-content center
        position fixed
        bottom .5rem
        right .3rem
        width .88rem
        height .88rem
        border-radius 50%
        background-color #00A7A3
        box-shadow .08rem .14rem .1rem rgba(0, 0, 0, .1)
        .max
            display inline-block
            width .48rem
            height .48rem
            background-repeat no-repeat
            background-size .48rem .48rem

        .max-order
            background-image url("../../common/images/ic_mine book.png")

    .meeting-item
        position relative
        width 100%
        padding .2rem .4rem
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
            margin-top .12rem
            width 5rem
            text-overflow: ellipsis
            overflow hidden
            white-space nowrap
        .meetbar-con
            display flex
            flex-direction column
            justify-content space-between
            margin-top .2rem
            height 1.04rem
            box-sizing border-box
            color #999
            .even-bar
                position relative
                height .28rem
                span
                    position absolute
                    transform translateX(-50%)
                    font-size .2rem !important
            .timeline
                position relative
                margin-top .1rem
                height .28rem
                background-color #e5f6f5
                box-sizing border-box
                width 100%
                .color-block
                    position absolute
                    height 100%
                .shortline
                    position absolute
                    display inline-block
                    width 1px
                    height 110%
                    background-color #00a7a3
                .shortline:nth-child(odd)
                    top -10%
            .odd-bar
                position relative
                height .28rem
                margin-top .1rem
                span
                    position absolute
                    transform translateX(-50%)
                    font-size .2rem !important
        .order-btn
            width 1.2rem
            height .52rem
            position: absolute
            top .2rem
            right .2rem
</style>
