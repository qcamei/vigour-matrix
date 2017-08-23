<template>
    <div id="event-history">
        <yd-infinitescroll :on-infinite="loadList" :distance="50" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/community/history/detail/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="img-con">
                            <img :src="item.image" />
                        </div>
                        <div class="disc-con">
                            <div class="top">
                                <div class="title">{{item.title}}</div>

                                <div v-if="item.status == 'pending'" class="status">待审批</div>
                                <div v-if="item.status == 'end'" class="status" style="color: #999;">已审批</div>
                            </div>
                            <div class="bottom">
                                <div class="datetime">{{item.datetime}}</div>
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                page: 1,
                pageSize: 10,
                list: [
                    {
                        id: 1,
                        title: '华谊星程大厦注册公司',
                        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503411629306&di=2dc924e97adf16273975b518b54680d8&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140327%2F235091-14032GFH631.jpg',
                        datetime: '2016-09-10',
                        status: 'pending'
                    },
                    {
                        id: 2,
                        title: '世纪豪城公司注册',
                        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504008339&di=7f5ec0dd9d7461b061b5f244d55497b3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140823%2F235033-140R30H34782.jpg',
                        datetime: '2016-09-12',
                        status: 'end'
                    },
                    {
                        id: 3,
                        title: '华谊星程大厦注册公司',
                        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503411629306&di=2dc924e97adf16273975b518b54680d8&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140327%2F235091-14032GFH631.jpg',
                        datetime: '2016-09-10',
                        status: 'pending'
                    },
                    {
                        id: 4,
                        title: '世纪豪城公司注册',
                        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504008339&di=7f5ec0dd9d7461b061b5f244d55497b3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140823%2F235033-140R30H34782.jpg',
                        datetime: '2016-09-12',
                        status: 'end'
                    },
                ]
            }
        },
        components: {},
        methods: {
            loadList() {
                console.log(this.$http.jsonp);
                this.$http.jsonp('http://list.ydui.org/getdata.php?type=backposition', {
                    params: {
                        page: this.page,
                        pagesize: this.pageSize
                    }
                }).then(function (response) {
                    const _list = response.body;

                    this.list = [...this.list, ..._list];

                    if (_list.length < this.pageSize || this.page == 3) {
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
