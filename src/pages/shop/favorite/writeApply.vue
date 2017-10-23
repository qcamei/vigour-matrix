<template>
    <div id="writeApply" style="padding-bottom: 1.2rem">
        <!--服务单信息-->
        <div class="service-con" v-if="serviceInfo">
            <div class="thumb">
                <img v-if="serviceInfo.mainImage.length" v-lazy="serviceInfo.mainImage[0].path"/>
            </div>
            <div class="content">
                <span class="title">{{ serviceInfo.mainTitle }}</span>
                <span class="desc">{{ serviceInfo.subTitle }}</span>
            </div>
        </div>

        <div class="total-price">
            <span class="label"></span>
            <span class="value">待申请</span>
        </div>

        <div class="custom-con">
            <div class="title">服务申请</div>

            <template v-for="(tpl, idx) in templates">
                <!--文本输入-->
                <yd-cell-group v-if="tpl.labelType === 'TEXT'" :key="idx">
                    <yd-cell-item>
                        <span slot="left">{{ tpl.name }}</span>
                        <yd-input
                            slot="right"
                            :required="!!tpl.isRequire"
                            v-model="tpl.value"
                            :placeholder="tpl.labelHint"
                            :show-success-icon="false"
                        ></yd-input>
                    </yd-cell-item>
                </yd-cell-group>

                <!--数字-->
                <yd-cell-group v-if="tpl.labelType === 'NUM'" :key="idx">
                    <yd-cell-item>
                        <span slot="left">{{ tpl.name }}</span>
                        <yd-input
                            slot="right"
                            :required="!!tpl.isRequire"
                            type="number"
                            v-model="tpl.value"
                            :placeholder="tpl.labelHint"
                            :show-success-icon="false"
                        ></yd-input>
                    </yd-cell-item>
                </yd-cell-group>

                <!--单选-->
                <mx-select
                    :key="idx"
                    v-if="tpl.labelType === 'SELECT'"
                    :label="tpl.name"
                    :chooseList="tpl.templateLabelItems"
                    :selectId="tpl.id"
                    defaultValue="请选择"
                    @selectEnd="selectEnd"
                ></mx-select>
            </template>

            <template>
                <!--图片-->
                <mx-uploader
                    v-if="imageTpls[idx].labelType === 'FILE'"
                    v-for="(item, idx) in imageTpls"
                    :key="idx"
                    :title="item.title"
                    :files="imageTpls[idx].files"
                    :deelFiles="imageTpls[idx].deelFiles"
                    :imageApi="'/platform/image'"
                    @uploadend="uploadEndCb"
                    :ref="item.id"
                    :fileId="item.id"
                ></mx-uploader>
            </template>
        </div>

        <!--按钮区-->
        <div class="posts-btn-con">
            <yd-button @click.native="cancel" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3"
                       style="border: 1px solid #e7e7e7">取消
            </yd-button>
            <yd-button @click.native="commit" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">提交申请
            </yd-button>
        </div>
    </div>
</template>
<script>
    import MxSelect from '../../../components/select/MxSelect.vue'
    import MxUploader from '../../../components/uploader/MxUploader.vue'
    import {
        getServiceDetail,
        getApplyTemplate,
        postApplyTemplate
    } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title

            getServiceDetail(this.$route.query.serviceProId).then(response => {
                if (response.body.code == 200) {
                    this.serviceInfo = response.body.data
                }
            })

            getApplyTemplate(this.$route.params.id).then(response => {
                if (response.body.code == 200) {
                    this.templates = response.body.data.templateLabels
                        .map(item => {
                            return {
                                ...item,
                                value: ''
                            }
                        })
                    this.imageTpls = response.body.data.templateLabels
                        .filter(item => item.labelType == 'FILE')
                        .map(cur => {
                            return {
                                ...cur,
                                title: cur.name,
                                files: [],
                                deelFiles: []
                            }
                        })
                    console.log(this.imageTpls)
                }
            })
        },
        data() {
            return {
                serviceInfo: null,
                templates: null,
                chooseList: null,
                imageTpls: null,
                info: {},
                imageSelectedAry: null,
                countAry: []
            }
        },
        components: {
            MxSelect,
            MxUploader
        },
        methods: {
            selectEnd(selectValue, selectId) {
                this.templates.forEach(item => {
                    if (item.id == selectId) {
                        item.value = selectValue
                    }
                })
            },
            cancel() {
                this.$router.go(-1)
            },
            commit() {
                this.$dialog.loading.open('发送中')

                this.imageSelectedAry = []
                this.imageTpls && this.imageTpls.forEach(item => {
                    if (item.files.length) this.imageSelectedAry.push(item.id)
                })
                if (this.imageTpls && this.imageSelectedAry.length) {
                    this.imageSelectedAry.forEach(id => {
                        this.$refs[id][0].submit()
                    })
                } else {
                    // 发送（无图片）
                    let tempPostInfo = this.templates
                    tempPostInfo.forEach(item => {
                        delete item.applyTemplateId
                        if (item.labelType == 'SELECT') {
                            delete item.templateLabelItems
                        }
                    })

                    let postInfo = {
                        serviceProId: this.$route.query.serviceProId,
                        applyLabelItems: tempPostInfo
                    }
                    postApplyTemplate(postInfo).then(response => {
                        if (response.body.code == 200) {
                            this.$dialog.loading.close()
                            this.$router.replace('/shop/order/myapply')
                        }
                    })
                }
            },
            uploadEndCb(data, id) {
                this.countAry.push({id, data})
                if (this.countAry.length === this.imageSelectedAry.length) {
                    this.templates.forEach(item => {
                        this.countAry.forEach(cur => {
                            if (item.id == cur.id) {
                                item.value = data[0]
                            }
                        })
                    })

                    let tempPostInfo = this.templates
                    tempPostInfo.forEach(item => {
                        delete item.applyTemplateId
                        if (item.labelType == 'SELECT') {
                            delete item.templateLabelItems
                        }
                    })

                    let postInfo = {
                        serviceProId: this.$route.query.serviceProId,
                        applyLabelItems: tempPostInfo
                    }
                    postApplyTemplate(postInfo).then(response => {
                        if (response.body.code == 200) {
                            this.$dialog.loading.close()
                            this.$router.replace('/shop/order/myapply')
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    span
        color #262626
        font-size .26rem

    .service-con
        background-color #fff
        padding .2rem
        display flex
        border 1px solid #f3f4f5
        .thumb
            width 1.2rem
            height 1.2rem
            overflow hidden
            img
                width 100%
                height 100%
                object-fit cover
        .content
            display flex
            flex-direction column
            justify-content space-between
            height 1.2rem
            margin-left .2rem
            .title
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                width 5.48rem
                color #333
            .text-red
                color #E65966
            .desc
                width 5.48rem
                color #999
                line-height: 1.2
                display: -webkit-box
                -webkit-line-clamp: 3
                -webkit-box-orient: vertical
                overflow: hidden
                margin-top .2rem
    .total-price
        background-color #ffffff
        border-bottom 1px solid #e7e7e7
        padding .2rem
        display flex
        align-items center
        justify-content space-between
        height .8rem
        margin-bottom .2rem
        .label
            color #333333
        .value
            color #E65966

    .custom-con
        background-color #ffffff
        .title
            height .8rem
            padding 0 .2rem
            border-bottom 1px solid #e7e7e7
            font-size .26rem
            line-height .8rem
            color #333
        .text-content
            border-bottom 1px solid #f3f4f5
            textarea
                width 100%
                border none
                outline none
                font-size 0.26rem
                padding 0.2rem

    .photo-tit
        font-size .3rem
        padding 0 .2rem
        height .8rem
        line-height .8rem
        .text1
            color #333
        .text2
            color #3f3f3f

    .vue-uploader
        position: relative
        padding 0 .4rem .2rem
        &:after
            content: ""
            position: absolute
            z-index: 0
            bottom: 0
            left: 0
            width: 100%
            border-bottom: 1px solid #e7e7e7
            -webkit-transform: scaleY(.5)
            transform: scaleY(.5)
            -webkit-transform-origin: 0 0
            transform-origin: 0 0
        .file-list
            display flex
            justify-content space-around
            .file-item
                position relative
                width 1.6rem
                height 1.6rem
                border-radius 2px
                overflow hidden
                img
                    width 100%
                    height 100%
                    border none
                    object-fit cover
                .file-remove
                    position absolute
                    right 0
                    top 0
                    width .4rem
                    height .4rem
                    color white
                    cursor pointer
                    line-height .4rem
                    border-radius 100%
                    -webkit-transform rotate(45deg)
                    transform rotate(45deg)
                    background rgba(0, 0, 0, 0.5)
                    font-size .4rem
                    text-align center
                    padding 0
                    box-sizing border-box
        .add
            width 1.6rem
            height 1.6rem
            display flex
            justify-content center
            align-items center
            box-sizing border-box
            background-color #fff
            border 1px dashed #979797
            color #979797
            font-size .8rem
        input[type="file"]
            display none

    .posts-btn-con
        display flex
        justify-content space-around
        align-items center
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        z-index 10
        .posts-btn
            width 3.45rem
            height .8rem
            margin 0
            font-size .28rem
            padding 0
            box-sizing border-box
</style>
