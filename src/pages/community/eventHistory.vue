<template>
    <div id="event-history">
        <yd-infinitescroll :on-infinite="loadList" :distance="50" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/community/history/detail/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="img-con">
                            <img :src="item.mainImage.length ? item.mainImage[0].path : void 0" />
                        </div>
                        <div class="disc-con">
                            <div class="top">
                                <div class="title">{{item.communityTitle}}</div>

                                <div v-if="item.approvalStatus == 'UNKNOWN'" class="status">未知</div>
                                <div v-if="item.approvalStatus == 'WAITSUBMIT'" class="status">待提交</div>
                                <div v-if="item.approvalStatus == 'WAITAPPROVAL'" class="status">待审批</div>
                                <div v-if="item.approvalStatus == 'ALREADYPASS'" class="status">已通过</div>
                                <div v-if="item.approvalStatus == 'NOPASS'" class="status">未通过</div>
                                <div v-if="item.approvalStatus == 'TERMINATION'" class="status">已终止</div>
                            </div>
                            <div class="bottom">
                                <div class="datetime">{{item.createTime}}</div>
                            </div>
                        </div>
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
    import { getCommunityHistoryList } from '../../api/api'

    export default {
        created() {
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
                getCommunityHistoryList({
                    page: this.page,
                    limit: this.limit
                }).then(response => {
                    const _list = response.body.data.items;

                    this.list = [...this.list, ..._list];

                    if (_list.length === 0) {
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
    #event-history
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
        .list-loading
            height 1.86rem
        .list-donetip
            padding .25rem 0 1.45rem
        .history-con
            position relative
            display flex
            width 100%
            height 2.02rem
            padding .2rem .4rem
            background-color #fff
            margin-bottom .2rem
            .img-con
                width 1.6rem
                height 1.6rem
                img
                    width 100%
                    height 100%
                    border none
                    object-fit cover
            .disc-con
                display flex
                flex-direction column
                justify-content space-between
                margin-left .2rem
                .top
                    display flex
                    align-items center
                    justify-content space-between
                    .title
                        text-align left
                        font-size .3rem
                        color #24242c
                        line-height .42rem
                        width 3.7rem
                        text-overflow ellipsis
                        overflow hidden
                        white-space nowrap
                    .status
                        position absolute
                        right .4rem
                        top .28rem
                        font-size .26rem
                        color #ff3f56
                .bottom
                    .datetime
                        font-size .26rem
                        color #999
</style>
