<template>
    <div style="background-color: rgb(250,250,250)">
        <div class="article-con">
            <div class="title">{{ infos.title }}</div>
            <div class="date-time">{{ infos.approvalTime }}</div>
            <div class="content" v-html="infos.content"></div>
        </div>
        <div class="posts-btn-con">
            <yd-button @click.native="newPosts" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">参加活动
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { getCommunityDetail } from '../../api/api'

    export default {
        created() {
            document.title = '社群活动详情'
            getCommunityDetail(this.$route.params.eventId).then(res => {
                this.infos = res.body.data
            })
        },
        data() {
            return {
                infos: {}
            }
        },
        components: {},
        methods: {
            newPosts() {
                this.$router.push(`/community/detail/${this.$route.params.eventId}/apply`)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .article-con
        width 100%
        padding 0 .2rem 1.4rem
        .title
            padding-top .2rem
            line-height 1.5
            font-size .4rem
            color #24242c
            text-align left
            margin-bottom .2rem
        .date-time
            text-align right
            font-size .26rem
            color #999
        .content
            font-size .26rem
            color #999
            line-height .38rem
            margin-top .2rem

    .posts-btn-con
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        .posts-btn
            height .8rem
            margin 0
            font-size .28rem
</style>
