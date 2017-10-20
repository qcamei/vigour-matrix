<template>
    <div>
        <yd-infinitescroll :callback="loadList" :distance="50" ref="infinitescrollDemo">

            <yd-list slot="list">
                <div class="comment-item" v-for="(item, idx) in list" :key="idx">
                    <div class="content">{{ item.commentText }}</div>
                    <div class="info">
                        <div class="rattings">
                            <span class="date">{{ item.createTime }}</span>
                            <div class="star">
                                <yd-rate
                                    size="14px"
                                    activeColor="#ee8f2b"
                                    padding="0.06rem"
                                    :readonly="true"
                                    v-model="item.gradeNum"
                                ></yd-rate>
                            </div>
                        </div>
                        <div class="price">¥ {{ item.price }}</div>
                    </div>
                </div>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">--------- 没有更多数据 ---------</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>
    </div>
</template>
<script>
    import { Rate } from 'vue-ydui/dist/lib.rem/rate'
    import { getCommentList } from '../../../api/shopApi'

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
                ratting: [3, 4]
            }
        },
        components: {
            [Rate.name]: Rate
        },
        methods: {
            loadList() {
                this.$dialog.loading.open('加载中')
                getCommentList(this.$route.params.id, {
                    page: this.page,
                    limit: this.limit
                }).then(response => {
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
    .comment-item
        margin-top .2rem
        background-color #fff
        padding  .2rem
        &:last-child
            margin-bottom 1.2rem
        .content
            font-size .26rem
            color #999
            line-height 1.3
        .info
            display flex
            flex-direction column
            justify-content space-between
            border-top 1px solid #e7e7e7
            .rattings
                display flex
                align-items center
                justify-content space-between
                height .62rem
                .date
                    font-size .26rem
                    color #999
            .price
                display flex
                justify-content flex-end
                align-items center
                font-size .26rem
                color #f16b5e
    .list-loading
        height 1.86rem
    .list-donetip
        padding .25rem 0 1.45rem
</style>
