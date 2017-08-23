<template>
    <div id="report-history">
        <yd-infinitescroll :on-infinite="loadList" :distance="50" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/report/${item.status}/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="title">{{item.title}}</div>
                        <div class="content">{{item.content}}</div>
                        <div class="datetime">{{item.datetime}}</div>
                        <div v-if="item.status == 'pending'" class="status">待处理</div>
                        <div v-if="item.status == 'closed'" class="status" style="color: #999;">已关闭</div>
                        <div v-if="item.status == 'coment'" class="status">待评价</div>
                    </div>
                </router-link>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>

        <div class="posts-btn-con">
            <yd-button @click.native="newPosts" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3" color="#fff">新建维修申报</yd-button>
        </div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                page: 1,
                pageSize: 10,
                list: [
                    {
                        id: 1,
                        title: "物业水电维修",
                        content: '世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。',
                        datetime: '2016-09-10 10:00:00',
                        status: 'pending'
                    },
                    {
                        id: 2,
                        title: "商标注册",
                        content: '浦东新区商标注册业务',
                        datetime: '2016-09-10 10:00:00',
                        status: 'closed'
                    },
                    {
                        id: 3,
                        title: "物业水电维修",
                        content: '世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。',
                        datetime: '2016-09-10 10:00:00',
                        status: 'coment'
                    },
                    {
                        id: 4,
                        title: "物业水电维修",
                        content: '世纪花园16#水电出现问题，排水管道修理。',
                        datetime: '2016-09-10 10:00:00',
                        status: 'pending'
                    },
                    {
                        id: 1,
                        title: "物业水电维修",
                        content: '世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。',
                        datetime: '2016-09-10 10:00:00',
                        status: 'pending'
                    },
                    {
                        id: 2,
                        title: "商标注册",
                        content: '浦东新区商标注册业务',
                        datetime: '2016-09-10 10:00:00',
                        status: 'closed'
                    },
                    {
                        id: 3,
                        title: "物业水电维修",
                        content: '世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。世纪花园16#水电出现问题，排水管道修理。',
                        datetime: '2016-09-10 10:00:00',
                        status: 'coment'
                    },
                    {
                        id: 4,
                        title: "物业水电维修",
                        content: '世纪花园16#水电出现问题，排水管道修理。',
                        datetime: '2016-09-10 10:00:00',
                        status: 'pending'
                    }
                ]
            }
        },
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
            },
            newPosts() {
                this.$router.push('/report/posts')
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #report-history
        .list-loading
            height 1.86rem
        .list-donetip
            padding .25rem 0 1.45rem
        .history-con
            position relative
            display flex
            flex-direction column
            width 100%
            height 2rem
            padding .2rem
            background-color #fff
            margin-bottom .2rem
            .title
                font-size .3rem
                color #24242c
                line-height .42rem
            .content
                font-size .24rem
                color #999
                margin-top .14rem
                line-height .36rem
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
            .datetime
                position: absolute
                right .2rem
                bottom .2rem
                font-size .26rem
                color #999
            .status
                position: absolute
                right .2rem
                top .2rem
                font-size .26rem
                color #e65966
        .posts-btn-con
            position fixed
            bottom 0
            left 0
            right 0
            width 100%
            height 1.2rem
            padding .2rem
            background-color #f5f4f9
            .posts-btn
                height .8rem
                margin 0
                font-size .28rem
</style>
