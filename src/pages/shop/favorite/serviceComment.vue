<template>
    <div>
        <div class="comment-item">
            <div class="content">
                张江世纪花园排水系统修复工程张江世纪花园排水系统修复工
                程张江世纪花园排水系统修复工程张江世纪花园排水系统修复
                工程张江世纪花园排水系统修复工程张江世纪花园排水系统修
                复工程张江世纪花园排水系统修复工程张江世纪花园排水系统
                修复工程张江世纪花园排水系统修复工程张江世纪花园排水系
                统...
            </div>
            <div class="info">
                <div class="rattings">
                    <span class="date">2016-09-28</span>
                    <div class="star">
                        <yd-rate
                            size="14px"
                            activeColor="#ee8f2b"
                            padding="0.06rem"
                            :readonly="true"
                            v-model="ratting[0]"
                        ></yd-rate>
                    </div>
                </div>
                <div class="price">¥ 12000</div>
            </div>
        </div>
        <div class="comment-item">
            <div class="content">
                张江世纪花园排水系统修复工程张江世纪花园排水系统修复工
                程张江世纪花园排水系统修复工程张江世纪花园排水系统修复
                工程张江世纪花园排水系统修复工程张江世纪花园排水系统修
                复工程张江世纪花园排水系统修复工程张江世纪花园排水系统
                修复工程张江世纪花园排水系统修复工程张江世纪花园排水系
                统...
            </div>
            <div class="info">
                <div class="rattings">
                    <span class="date">2016-09-28</span>
                    <div class="star">
                        <yd-rate
                            size="14px"
                            activeColor="#ee8f2b"
                            padding="0.06rem"
                            :readonly="true"
                            v-model="ratting[1]"
                        ></yd-rate>
                    </div>
                </div>
                <div class="price">¥ 12000</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Rate } from 'vue-ydui/dist/lib.rem/rate'

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {
                ratting: [3, 4]
            }
        },
        components: {
            [Rate.name]: Rate
        },
        methods: {}
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
</style>
