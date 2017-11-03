<template>
    <div>
        <yd-infinitescroll :callback="loadList" :distance="50" ref="infinitescrollDemo">
            <yd-list slot="list">
                <router-link :to="`/shop/serviceDetail/${item.id}/imageText`" v-for="(item, idx) in list" :key="idx">
                    <mx-slide-delete
                        :itemId="item.id"
                        @deleteItem="deleteItem(item.id)"
                        ref="deleteCon"
                        deleteStyles="z-index: -1; height: calc(100% - .2rem)"
                    >
                        <div class="favorite-item">
                            <div class="img-con">
                                <img v-lazy="item.mainImage[0].path" />
                            </div>
                            <div class="disc-con">
                                <div class="top">
                                    <div class="title">{{ item.mainTitle }}</div>
                                    <div class="status" v-if="item.approvalStatus === 'UNPUBLISH'">已下架</div>
                                </div>
                                <div class="bottom">
                                    <div class="price"></div>
                                    <div class="datetime">{{ item.createTime }}</div>
                                </div>
                            </div>
                        </div>
                    </mx-slide-delete>
                </router-link>
            </yd-list>
        </yd-infinitescroll>

        <div v-show="historyFlag" class="no-history"><span>暂无数据</span></div>
    </div>
</template>
<script>
    import MxSlideDelete from '../../../components/slideDelete/MxSlideDelete.vue'
    import { getFavoriteList, removeFavorite } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
            this.loadList()
        },
        data() {
            return {
                page: 1,
                limit: 10,
                list: [],
                historyFlag: false
            }
        },
        components: {
            MxSlideDelete
        },
        methods: {
            deleteItem(id) {
                removeFavorite(id).then(response => {
                    if (response.body.code == 200) {
                        this.list = this.list.filter(item => item.id != id)
                        this.$refs.deleteCon.forEach(item => item.txtStyle = '')
                    }
                })
            },
            loadList() {
                this.$dialog.loading.open('加载中')
                getFavoriteList({
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
                    }).catch(e => console.log(e))
            },
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .favorite-item
        position relative
        display flex
        width 100%
        height 1.6rem
        padding .2rem
        background-color #fff
        margin-bottom .2rem
        .img-con
            width 1.2rem
            height 1.2rem
            img
                width 100%
                height 100%
                border none
                object-fit cover
        .disc-con
            display flex
            flex-direction column
            justify-content space-between
            width calc(100% - 1.2rem)
            margin-left .2rem
            .top
                display flex
                align-items center
                justify-content space-between
                .title
                    text-align left
                    font-size .26rem
                    color #333
                    line-height .42rem
                    width 3.7rem
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
                .status
                    position absolute
                    right .2rem
                    top .2rem
                    font-size .26rem
                    color #ff3f56
            .mid
                text-align right
                font-size .26rem
                color red
            .bottom
                display flex
                justify-content space-between
                .price
                    font-size .26rem
                    color #e65966
                .datetime
                    font-size .26rem
                    color #999
    .no-history
        width 6rem
        height 4.4rem
        background-image url('../../../common/images/ic_no history@3x.png')
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
    .list-loading
        height 1.86rem
    .list-donetip
        padding .25rem 0 1.45rem
</style>
