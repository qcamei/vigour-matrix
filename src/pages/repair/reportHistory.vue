<template>
    <div id="report-history">
        <yd-infinitescroll :on-infinite="loadList" :distance="50" ref="infinitescrollDemo">

            <yd-list slot="list">
                <div v-for="(item, idx) in list" :key="idx" @click="jumpPage(item.taskStatus, item.id)">
                    <div class="history-con">
                        <div class="title">{{item.title}}</div>
                        <div class="content">{{item.description}}</div>
                        <div class="datetime">{{item.createTime}}</div>
                        <div v-if="item.taskStatus == 'UNKNOWN'" class="status">未知</div>
                        <div v-if="item.taskStatus == 'WAITALLOT'" class="status">待分配</div>
                        <div v-if="item.taskStatus == 'WAITEXECUTOR'" class="status">待处理</div>
                        <div v-if="item.taskStatus == 'WAITCOMMENT'" class="status">待评价</div>
                        <div v-if="item.taskStatus == 'FINISH'" class="status">已完成</div>
                        <div v-if="item.taskStatus == 'ISCLOSE'" class="status" style="color: #999;">已关闭</div>
                    </div>
                </div>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">--------- 没有更多数据 ---------</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>

        <div v-show="historyFlag" class="no-history"><span>暂无历史纪录</span></div>

        <div class="posts-btn-con">
            <yd-button @click.native="newPosts" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">新建维修申报
            </yd-button>
        </div>
    </div>
</template>
<script>
    import {getReportList} from '../../api/api'

    export default {
        created() {
            document.title = '维修申报记录'
            this.loadList()
        },
        components: {},
        data() {
            return {
                page: 1,
                limit: 10,
                list: [],
                historyFlag: false
            }
        },
        methods: {
            loadList() {
                this.$dialog.loading.open('加载中')
                getReportList({
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
            newPosts() {
                this.$router.push('/report/posts')
            },
            jumpPage(status, id) {
                switch (status) {
                    case 'WAITALLOT':
                        this.$router.push(`/report/pending/${id}`)
                        break;
                    case 'WAITEXECUTOR':
                        this.$router.push(`/report/pending/${id}`)
                        break;
                    case 'WAITCOMMENT':
                        this.$router.push(`/report/coment/${id}`)
                        break;
                    case 'FINISH':
                        this.$router.push(`/report/closed/${id}`)
                        break;
                    case 'ISCLOSE':
                        this.$router.push(`/report/closed/${id}`)
                        break;
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #report-history
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
