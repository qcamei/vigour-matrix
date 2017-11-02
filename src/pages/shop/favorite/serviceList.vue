<template>
    <div style="font-size: 0">
        <yd-infinitescroll :callback="loadList" :distance="50" ref="infinitescrollDemo" v-if="$route.query.mode !== 'special'">

            <yd-list slot="list">
                <router-link v-for="(item, idx) in list" :key="idx" class="order-item" :to="`/shop/serviceDetail/${item.serviceProId}/imageText`">
                    <div class="sub-con">
                        <div class="thumb">
                            <img v-lazy="item.mainImage" />
                        </div>
                        <div class="content">
                            <span class="title">{{ item.mainTitle }}</span>
                            <span class="price"></span>
                            <span class="desc">{{ item.synopsis }}</span>
                        </div>
                    </div>
                </router-link>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">--------- 没有更多数据 ---------</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>

        <yd-infinitescroll :callback="loadList" :distance="50" ref="infinitescrollDemo" v-if="$route.query.mode === 'special'">

            <yd-list slot="list">
                <router-link class="order-item" v-for="(item, idx) in list" :key="idx" :to="`/shop/serviceDetail/${item.serviceProId}/imageText`">
                    <div class="sub-con">
                        <div class="thumb">
                            <img v-lazy="item.serviceProjectMap.mainImage" />
                        </div>
                        <div class="content">
                            <span class="title">{{ item.serviceProjectMap.mainTitle }}</span>
                            <span class="price"></span>
                            <span class="desc">{{ item.synopsis }}</span>
                        </div>
                    </div>
                </router-link>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">--------- 没有更多数据 ---------</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>
        <div v-show="historyFlag" class="no-history"><span>暂无数据</span></div>
    </div>
</template>
<script>
    import {
        getSpecialServiceList,
        getParkSelfList,
        getServiceListByType,
        getServiceListByStage
    } from '../../../api/shopApi'
    export default {
        created() {
            document.title = this.$route.meta.title
            const mode = this.$route.query.mode
            switch (mode) {
                case 'type':
                    this.getData = getServiceListByType.bind(null, this.$route.params.id, {
                        page: this.page,
                        limit: this.limit
                    })
                    break;
                case 'special':
                    this.getData = getSpecialServiceList.bind(null, {
                        page: this.page,
                        limit: this.limit
                    })
                    break;
                case 'self':
                    this.getData = getParkSelfList.bind(null, {
                        page: this.page,
                        limit: this.limit
                    })
                    break;
                case 'stage':
                    this.getData = getServiceListByStage.bind(null, this.$route.params.id, {
                        page: this.page,
                        limit: this.limit
                    })
                    break;
            }

            this.loadList()
        },
        data() {
            return {
                page: 1,
                limit: 10,
                list: [],
                historyFlag: false,
                getData: null
            }
        },
        components: {},
        methods: {
            loadList() {
                this.$dialog.loading.open('加载中')
                this.getData().then(response => {
                        if (response.body.code == 200) {
                            let _list = null

                            if (this.$route.query.mode === 'special') {
                                if (!response.body.data.length) {
                                    this.$dialog.loading.close()
                                    this.historyFlag = true
                                    return
                                }
                                if (!response.body.data[0].siftItems.length) {
                                    this.$dialog.loading.close()
                                    this.historyFlag = true
                                    return
                                }
                                _list = response.body.data[0].siftItems
                            } else {
                                _list = response.body.data.items
                            }

                            this.list = [...this.list, ..._list]

                            console.log(this.list);

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
    .order-item
        background-color #fff
        margin-bottom .2rem
        display inline-block
        width 100%
        .sub-con
            border-top 1px solid #f3f4f5
            padding .2rem .2rem
            overflow hidden
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
                width 4.8rem
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
                    line-height 1.2
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
