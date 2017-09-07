<template>
    <div id="my-order">
        <yd-infinitescroll :on-infinite="loadList" :distance="100" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/bill/detail/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="title-con">
                            <div class="title">{{item.billMonthShow}}</div>
                            <div class="status" style="color: #e65966"
                                 v-text="item.confirmStatusShow"></div>
                        </div>
                        <div class="number">合同号：{{item.billNo}}</div>
                        <div class="date-time">{{item.pushTime}}</div>
                    </div>
                </router-link>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>

        <div v-show="historyFlag" class="no-history"><span>暂无历史纪录</span></div>
    </div>
</template>
<script>
    import { getBillList } from '../../api/api'

    export default {
        created() {
            document.title = '企业账单'
             this.loadList()
        },
        data() {
            return {
                page: 1,
                limit: 10,
                list: [],
                historyFlag: false,
            }
        },
        components: {},
        methods: {
            loadList() {
                getBillList({
                    page: this.page,
                    limit: this.limit
                })
                    .then(response => {
                        const _list = response.body.data.items;

                        this.list = [...this.list, ..._list];

                        if (this.list.length === 0) {
                            this.historyFlag = true
                            return
                        }

                        if (_list.length < this.limit) {
                            /* 所有数据加载完毕 */
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                            return;
                        }

                        /* 单次请求数据完毕 */
                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');

                        this.page++;
                    });
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #my-order
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
        .history-con
            position relative
            display flex
            flex-direction column
            width 100%
            height 2rem
            padding .2rem
            box-sizing border-box
            background-color #fff
            margin-bottom .2rem
            color #999
            font-size .26rem
            .title-con
                display flex
                justify-content space-between
                .title
                    width 4.7rem
                    font-size .3rem
                    color #333
            .number
                margin-top .16rem
            .date-time
                position absolute
                right .2rem
                bottom .2rem
</style>
