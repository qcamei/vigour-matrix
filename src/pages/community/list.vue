<template>
    <div>
        <router-link :to="`/community/detail/${item.id}`" class="activity-item" v-for="(item, idx) in list" :key="idx">
            <div class="img-con">
                <img
                    :src="item.image"/>
            </div>
            <div class="desc-con">
                <span class="tit">{{ item.title }}</span>
                <span class="content">{{ item.content }}</span>
                <div class="btn-con">
                    <span>{{ item.datetime }}</span>
                    <yd-button
                        class="look-detail"
                        type="primary"
                        bgcolor="#00A7A3"
                        color="#fff"
                        style="width: 2rem; height: .6rem;"
                    >查看详情
                    </yd-button>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [
                    {
                        id: 1,
                        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503411629306&di=2dc924e97adf16273975b518b54680d8&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140327%2F235091-14032GFH631.jpg',
                        title: '上海秋季全程马拉松赛',
                        content: '本次比赛起点为陆家嘴金融中心，途经南京东路、陕西南路，到达闸北区终点汶水路',
                        datetime: '2016-10-30 10:00:00'
                    },
                    {
                        id: 2,
                        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504008339&di=7f5ec0dd9d7461b061b5f244d55497b3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140823%2F235033-140R30H34782.jpg',
                        title: '上海秋季全程马拉松赛',
                        content: '本次比赛起点为陆家嘴金融中心，途经南京东路、陕西南路，到达闸北区终点汶水路',
                        datetime: '2016-10-30 10:00:00'
                    }
                ]
            }
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .activity-item
        display block
        width 100%
        height 6rem
        background-color #fff
        margin-bottom .2rem
        .img-con
            width 100%
            height 3.6rem
            img
                width 100%
                height 100%
                object-fit cover
        .desc-con
            display flex
            flex-direction column
            justify-content space-between
            width 100%
            height 2.4rem
            padding .2rem
            .tit
                font-size .3rem
                color #24242c
                line-height .42rem
            .content
                margin-top .06rem
                font-size .26rem
                color #999
                line-height .36rem
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
            .btn-con
                display flex
                justify-content space-between
                align-items center
                span
                    font-size .26rem
                    color #999
</style>
