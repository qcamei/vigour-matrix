<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">预定人姓名</span>
                <span slot="right" style="color: #24242c">{{info.contact}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">预定人手机</span>
                <span slot="right" style="color: #24242c">{{info.phone}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">选择会议室</span>
                <span class="a123" slot="right" style="color: #24242c">{{info.roomName}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">开始时间</span>
                <span slot="right" style="color: #24242c">{{info.startTime}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">结束时间</span>
                <span slot="right" style="color: #24242c">{{info.endTime}}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="详细描述">
            <yd-cell-item>
                <yd-textarea slot="right" :readonly="true" maxlength="140" ref="textarea" v-html="info.content"
                             style="text-align: left"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <div class="posts-btn-con">
            <yd-button @click.native="cancel" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">取消预定
            </yd-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: {
                    contact: '张三',
                    phone: '18027364646',
                    roomName: '会议室1',
                    startTime: '2017-08-07 16:00',
                    endTime: '2017-08-07 17:00',
                    content: '项目例会，大概一个小时！'
                },
            }
        },
        components: {},
        methods: {
            cancel() {

            }
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
