<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">处理状态</span>
                <input slot="right" :showClearIcon="false" v-model="postInfo.status" style="color: #e65966;" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系人</span>
                <input slot="right" :showClearIcon="false" placeholder="请输入联系人姓名" v-model="postInfo.contacts" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系电话</span>
                <input slot="right" :showClearIcon="false" required readonly placeholder="请输入联系电话"
                       v-model="postInfo.phone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">位置</span>
                <input slot="right" required :showClearIcon="false" readonly placeholder="请输入位置"
                       v-model="postInfo.position">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">设备类型</span>
                <input slot="right" required :showClearIcon="false" readonly placeholder="请输入设备类型"
                       v-model="postInfo.deviceType">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="详细描述">
            <yd-cell-item>
                <yd-textarea
                    style="text-align: left;font-size: 0.26rem; color: #24242c;"
                    slot="right"
                    maxlength="140"
                    :readonly="true"
                    v-html="postInfo.detail">
                </yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <!-- 图片上传 -->
        <div class="photo-tit">
            <span class="text1">添加现场图片</span>
            <span class="text2">（最多支持上传三张图片）</span>
        </div>
        <ul class="upload-list">
            <li><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></li>
            <li><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                postInfo: {
                    status: '待处理',
                    contacts: '李四',
                    phone: '186-2938-4099',
                    position: '上海市曲阳路888号',
                    deviceType: '门禁',
                    detail: '门禁坏了，进不去！'
                },
                imgUrls: []
            }
        },
        components: {},
        methods: {

        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #post-con
        padding-bottom 1.4rem
        #input-group
            input
                text-align right
                font-size .26rem
                color #24242c
                width 5.2rem
            span
                font-size .26rem
                color #999
        .photo-tit
            font-size .3rem
            padding 0 .2rem
            .text1
                color #333
            .text2
                color #3f3f3f
        .upload-list
            display flex
            justify-content flex-start
            margin-top .35rem
            li
                display flex
                justify-content center
                position relative
                width 33vw
                border-radius 2px
                overflow hidden
                img
                    width 1.6rem
                    height 1.6rem
                    border none
                    border-radius 2px
                    object-fit cover
</style>
