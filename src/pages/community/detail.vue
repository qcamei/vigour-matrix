<template>
    <div>
        <div class="article-con">
            <div class="title">{{ infos.title }}</div>
            <div class="date-time">{{ infos.datetime }}</div>
            <div class="content" v-html="infos.content"></div>
        </div>
        <div class="posts-btn-con">
            <yd-button @click.native="newPosts" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3" color="#fff">参加活动</yd-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                infos: {
                    id: '1',
                    title: '上海秋季全程马拉松赛',
                    datetime: '2016-10-30 10:00:00',
                    content: '<p>一、主办单位\n' +
                    '中国田径协会、上海市体育总会、黄浦区人民政府、静安区\n' +
                    '人民政府、徐汇区人民政府、上海东浩兰生国际服务贸易（集\n' +
                    '团）有限公司；\n' +
                    '\n' +
                    '二、承办单位\n' +
                    '上海东浩兰生赛事管理有限公司；\n' +
                    '\n' +
                    '三、协办单位\n' +
                    '上海市田径协会、上海市路跑协会、黄浦区体育总会、静安区\n' +
                    '体育总会、徐汇区体育总会、上海东亚体育文化中心有限公司\n' +
                    '、五星体育、东方卫视；\n' +
                    '\n' +
                    '四、竞赛日期及地点\n' +
                    '（一）比赛时间：2016年10月30日（星期日）7:00；\n' +
                    '（二）起点：外滩金牛广场；\n' +
                    '（三）马拉松、半程马拉松终点：上海体育场；\n' +
                    '（四）10公里跑终点：复兴公园；\n' +
                    '（五）健身跑终点：上海展览中心；\n' +
                    '\n</p>'
                }
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
            height .84rem
            line-height .84rem
            font-size .3rem
            color #24242c
            text-align center
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
