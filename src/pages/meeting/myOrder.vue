<template>
    <div id="my-order">
        <yd-infinitescroll :on-infinite="loadList" :distance="100" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/meeting/myorder/detail/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="title">{{item.title}}</div>
                        <div class="info-con">
                            <div class="date-time">{{item.datetime}}</div>
                            <div class="status">
                                <span>预定状态：</span>
                                <span :style="{color: item.status == 'cancel' ? '#e65966' : void 0}" v-text="item.status == 'ok' ? '已预订' : '已取消'"></span>
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
                        title: '会议室1',
                        datetime: '2016-09-10 16:00-18:00',
                        status: 'ok'
                    },
                    {
                        id: 2,
                        title: '会议室4',
                        datetime: '2016-09-10 16:00-18:00',
                        status: 'cancel'
                    },
                    {
                        id: 3,
                        title: '会议室2',
                        datetime: '2016-09-10 16:00-18:00',
                        status: 'ok'
                    },
                    {
                        id: 4,
                        title: '会议室1',
                        datetime: '2016-09-10 16:00-18:00',
                        status: 'cancel'
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
    #my-order
        .history-con
            position relative
            display flex
            justify-content space-between
            align-items center
            width 100%
            height 1.52rem
            padding .3rem
            box-sizing border-box
            background-color #fff
            margin-bottom .2rem
            color #24242c
            .title
                font-size .3rem
            .info-con
                display flex
                flex-direction column
                justify-content space-between
                align-items flex-end
                font-size .26rem
                height 100%
</style>
