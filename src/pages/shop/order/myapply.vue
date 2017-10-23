<template>
    <div style="font-size: 0">
        <yd-infinitescroll :callback="loadList" :distance="50" ref="infinitescrollDemo">
            <yd-list slot="list">
                <router-link class="order-item" v-for="(item, idx) in list" :key="idx" :to="`/shop/myapplyDetail/${item.id}`">
                    <div class="title-con">
                        <span class="date">{{ item.createTime }}</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYWAITALLOT'">待分配</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYWAITASSESS'">待评估</span>
                        <span class="status" v-if="item.applyOrderStatus === 'ALREADREPULS'">已拒绝</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYWAITVERIFY'">待确认下单</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYWAITEXECUTOR'">待执行</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYWAITSERVICEVERIFY'">待服务确认</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYWAITCOMMENT'">待评价</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYFINISH'">已完成</span>
                        <span class="status" v-if="item.applyOrderStatus === 'APPLYCANCEL'">已取消</span>
                    </div>
                    <div class="sub-con">
                        <div class="thumb">
                            <img v-lazy="item.mainImage"/>
                        </div>
                        <div class="content">
                            <span class="title">{{ item.mainTitle }}</span>
                            <span class="price" v-if="item.price">￥{{ item.price }}</span>
                            <span class="desc">{{ item.synopsis }}</span>
                        </div>
                    </div>
                </router-link>
            </yd-list>
        </yd-infinitescroll>

        <div v-show="historyFlag" class="no-history"><span>暂无数据</span></div>
    </div>
</template>
<script>
    import { getApplyList } from '../../../api/shopApi'
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
        components: {},
        methods: {
            loadList() {
                this.$dialog.loading.open('加载中')
                getApplyList({
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
                    this.$dialog.loading.close()
                    this.$dialog.toast({
                        mes: e.statusText,
                        timeout: 500
                    })
                })
            },
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .order-item
        background-color #fff
        margin-top .2rem
        display inline-block
        width 100%
        .title-con
            height .8rem
            padding 0 .2rem
            display flex
            align-items center
            justify-content space-between
            .date
                font-size .26rem
                color #333
            .status
                font-size .26rem
                color #e96a76
        .sub-con
            border-top 1px solid #f3f4f5
            padding .2rem .4rem
            overflow hidden
            display flex
            .thumb
                width 1.6rem
                height 1.6rem
                float left
                img
                    width 100%
                    height 100%
                    object-fit cover
                    background-color #cccccc
            .content
                float left
                display flex
                flex-direction column
                justify-content space-between
                width 4.9rem
                height 1.6rem
                margin-left .2rem
                .title
                    font-size .3rem
                    color #333
                .price
                    font-size .26rem
                    color #e96a76
                .desc
                    font-size .24rem
                    color #999
                    line-height 1.4
                    display -webkit-box
                    -webkit-line-clamp 3
                    -webkit-box-orient vertical
                    overflow hidden
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
