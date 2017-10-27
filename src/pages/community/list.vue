<template>
    <div id="community">

        <yd-infinitescroll :on-infinite="loadList" :distance="50" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/community/detail/${item.id}`" class="activity-item" v-for="(item, idx) in list" :key="idx">
                    <div class="img-con">
                        <img
                            :src="item.mainImage.length ? item.mainImage[0].path : void 0"/>
                    </div>
                    <div class="desc-con">
                        <span class="tit">{{ item.title }}</span>
                        <span class="content">{{ item.discrible }}...</span>
                        <div class="btn-con">
                            <span>{{ item.approvalTime }}</span>
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
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">--------- 没有更多数据 ---------</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>

        <div v-show="historyFlag" class="no-history"><span>暂无活动纪录</span></div>

        <router-link class="max-btn-history" to="/community/history">
            <i class="max max-history"></i>
        </router-link>

    </div>
</template>
<script>
    import { getCommunityList } from '../../api/api'

    export default {
        created() {
            document.title = '社群活动'
            this.loadList()
        },
        data() {
            return {
                page: 1,
                limit: 5,
                list: [],
                historyFlag: false
            }
        },
        components: {},
        methods: {
            loadList() {
                this.$dialog.loading.open('加载中')
                getCommunityList({
                    page: this.page,
                    limit: this.limit
                })
                    .then(response => {
                        if (response.body.code == 200) {
                            const _list = response.body.data.items

                            this.list = [...this.list, ..._list]

                            if (this.list.length === 0) {
                                this.$dialog.loading.close()
                                this.historyFlag = true
                                return
                            }

                            if (_list.length < this.limit) {
                                /* 所有数据加载完毕 */
                                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                                this.$dialog.loading.close()
                                return
                            }

                            /* 单次请求数据完毕 */
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
                            this.$dialog.loading.close()
                            this.page++
                        }
                        else {
                            this.$dialog.loading.close()
                            this.$dialog.toast({
                                mes: response.body.message,
                                timeout: 500
                            })
                        }
                    }).catch(e => {
                    this.$dialog.toast({
                        mes: e.statusText,
                        timeout: 500
                    });
                    this.$dialog.loading.close()
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .max-btn-history
        display flex
        align-items center
        justify-content center
        position fixed
        bottom .3rem
        right .2rem
        width .88rem
        height .88rem
        border-radius 5%
        background-color #00A7A3
        box-shadow .08rem .14rem .1rem rgba(0, 0, 0, .1)
        .max
            display inline-block
            width .48rem
            height .48rem
            background-repeat no-repeat
            background-size .48rem .48rem
        .max-history
            background-image url("../../common/images/ic_history.png")
    .no-history
        width 6rem
        height 4.4rem
        background-image url('../../common/images/ic_no history@3x.png')
        background-size 6rem 4.4rem
        background-repeat no-repeat
        position absolute
        left 50%
        top 45%
        margin-top -2.2rem
        margin-left -3rem
        span
            font-size .3rem
            color #333
            position absolute
            bottom -.6rem
            left 50%
            transform translateX(-50%)
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
