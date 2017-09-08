<template>
    <div style="padding-bottom: 1.4rem">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left" class="label-text">可容纳人数</span>
                <span slot="right" class="value-text">{{ info.containNum }}人</span>
            </yd-cell-item>
            <yd-cell-item style="height: 2.4rem">
                <span slot="left" class="label-text">照片</span>
                <!--<div slot="right" class="image-con">-->
                    <!--<ul class="upload-list">-->
                        <!--<li v-for="(image, idx) in imageList" :key="idx"><img class="room-image" :src="image"/></li>-->
                    <!--</ul>-->
                <!--</div>-->
                <yd-lightbox slot="right" :num="imageList.length" class="upload-list">
                    <div class="room-item" v-for="(image, idx) in imageList" :key="idx">
                        <yd-lightbox-img class="room-image"  :src="image" ></yd-lightbox-img>
                    </div>
                </yd-lightbox>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="label-text">会议室设备</span>
                <div slot="right" class="value-text" style="line-height: 1.5; padding: .2rem">
                    <ul class="device-list">
                        <li v-for="(item, idx) in deviceList" :key="idx">{{ item }}</li>
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
    import { getMeetingList } from '../../api/api'
    import { LightBox, LightBoxImg, LightBoxTxt } from 'vue-ydui/dist/lib.rem/lightbox';

    export default {
        created() {
            document.title = '会议室信息'

            getMeetingList(moment().format('YYYY-MM-DD'))
                .then(res => {
                    res.body.data.forEach(item => this.roomList.push(item.name))
                    return res
                })
                .then(res => this.info = res.body.data.find(item => item.id == this.$route.params.id))
                .then(data => this.imageList = JSON.parse(data.images))
        },
        watch: {
            info: {
                handler(newVal, oldVal) {
                    this.deviceList = newVal['equipmentNames'] ? newVal['equipmentNames'].split(', ') : []
                },
                deep: true
            }
        },
        data() {
            return {
                info: {},
                imageList: [],
                roomList: [],
                deviceList: []
            }
        },
        components: {
            [LightBox.name]: LightBox,
            [LightBoxImg.name]: LightBoxImg,
            [LightBoxTxt.name]: LightBoxTxt
        },
        methods: {
            addOrder() {
                this.$router.push({
                    name: 'meetingAdd', params: {
                        id: this.info.id,
                        tierName: this.info.name,
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
                .room-item
                    display flex
                    justify-content center
                    position relative
                    border-radius 2px
                    overflow hidden
                    width 33vw
                .room-image
                    width 1.6rem
                    height 1.6rem
                    border none
                    border-radius 2px
                    object-fit cover
                    background-color #f3f4f5
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
