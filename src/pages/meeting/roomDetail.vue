<template>
    <div style="padding-bottom: 1.4rem">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left" class="label-text">可容纳人数</span>
                <span slot="right" class="value-text">{{ info.cotainNum }}人</span>
            </yd-cell-item>
            <yd-cell-item style="height: 2.4rem">
                <span slot="left" class="label-text">照片</span>
                <div slot="right" class="image-con">
                    <ul class="upload-list">
                        <li v-for="(image, idx) in imageList" :key="idx"><img :src="image"/></li>
                    </ul>
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="label-text">会议室设备</span>
                <div slot="right" class="value-text" style="height: 1rem; line-height: 1rem">
                    <ul class="device-list">
                        <li>投影设备</li>
                        <li>液晶电视</li>
                        <li>移动白板</li>
                        <li>电话机</li>
                    </ul>
                </div>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="详细描述">
            <yd-cell-item>
                <yd-textarea
                    style="text-align: left;font-size: 0.26rem; color: #24242c; line-height: 1.4"
                    slot="right"
                    maxlength="140"
                    :readonly="true"
                    v-html="info.description">
                </yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <div class="posts-btn-con">
            <yd-button @click.native="addOrder" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">添加预定
            </yd-button>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import {getMeetingList} from '../../api/api'

    export default {
        created() {
            getMeetingList(moment().format('YYYY-MM-DD'))
                .then(res => {
                    res.body.data.forEach(item => this.roomList.push(item.tierName))
                    return res
                })
                .then(res => this.info = res.body.data.find(item => item.id == this.$route.params.id))
                .then(data => this.imageList = JSON.parse(data.images))
        },
        data() {
            return {
                info: {},
                imageList: [],
                roomList: []
            }
        },
        components: {},
        methods: {
            addOrder() {
                this.$router.push({
                    name: 'meetingAdd', params: {
                        id: this.info.id,
                        tierName: this.info.tierName,
                        roomList: encodeURIComponent(this.roomList)
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #input-group
        .label-text
            font-size .26rem
            color #999
        .value-text
            font-size .26rem
            color: #24242c
        .image-con
            width 6rem
            .upload-list
                display flex
                justify-content flex-start
                li
                    display flex
                    justify-content center
                    position relative
                    width 33vw
                    border-radius 2px
                    overflow hidden
                    img
                        width 1.6rem
                        height 1.6rem
                        border none
                        border-radius 2px
                        object-fit cover
        .device-list
            overflow hidden
            li
                float left
                margin 0 .06rem

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
