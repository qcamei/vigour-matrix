<template>
    <div id="my-order">
        <yd-infinitescroll :on-infinite="loadList" :distance="100" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/bill/detail/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="title-con">
                            <div class="title">{{item.title}}</div>
                            <div class="status" :style="{color: item.status == 'pending' ? '#e65966' : void 0}" v-text="item.status == 'ok' ? '已支付' : '待支付'"></div>
                        </div>
                        <div class="number">合同号：{{item.number}}</div>
                        <div class="date-time">{{item.datetime}}</div>
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
                        title: '2016年11月账单',
                        datetime: '2016-09-10 10:00',
                        status: 'ok',
                        number: 'A0000000000001'
                    },
                    {
                        id: 2,
                        title: '2016年10月账单',
                        datetime: '2016-09-10 16:00-18:00',
                        status: 'pending',
                        number: 'A0000000000001'
                    },
                    {
                        id: 3,
                        title: '2016年9月账单',
                        datetime: '2016-09-10 16:00-18:00',
                        status: 'ok',
                        number: 'A0000000000001'
                    },
                    {
                        id: 4,
                        title: '2016年8月账单',
                        datetime: '2016-09-10 16:00-18:00',
                        status: 'pending',
                        number: 'A0000000000001'
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
