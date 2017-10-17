<template>
    <div id="writeApply" style="padding-bottom: 1.2rem">
        <!--服务单信息-->
        <div class="service-con">
            <div class="thumb">
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
            </div>
            <div class="content">
                <span class="title">张江世纪花园排水修复工作张江世纪花园排水</span>
                <span class="text-red">¥ 12,000.00</span>
            </div>
        </div>

        <div class="total-price">
            <span class="label">订单总金额</span>
            <span class="value">待评估</span>
        </div>

        <div class="custom-con">
            <div class="title">服务申请</div>

            <!--文本输入-->
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">联系人</span>
                    <yd-input
                        slot="right"
                        required
                        v-model="info.name"
                        placeholder="请输入联系人姓名"
                    ></yd-input>
                </yd-cell-item>
            </yd-cell-group>

            <!--数字-->
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">联系方式</span>
                    <yd-input
                        slot="right"
                        required
                        type="number"
                        v-model="info.cellphone"
                        placeholder="请输入电话号码"
                    ></yd-input>
                </yd-cell-item>
            </yd-cell-group>

            <!--文本-->
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">企业名称</span>
                    <yd-input
                        slot="right"
                        required
                        v-model="info.companyName"
                        placeholder="请输入企业名称"
                    ></yd-input>
                </yd-cell-item>
            </yd-cell-group>

            <!--单选-->
            <mx-select
                label="企业类型"
                :chooseList="[{label: 'OTO'}, {label: 'P2P'}]"
                defaultValue="请选择"
                @selectEnd="selectEnd"
            ></mx-select>

            <!--textarea-->
            <div class="text-content">
                <textarea rows="4" placeholder="请输入文本内容">{{ info.textarea }}</textarea>
            </div>

            <!--图片-->
                <mx-uploader
                    v-for="(item, idx) in imageArr"
                    :key="idx"
                    :title="item.title"
                    :files="imageArr[idx].files"
                    :deelFiles="imageArr[idx].deelFiles"
                ></mx-uploader>
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

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {
                info: {
                    name: '',
                    cellphone: '',
                    companyName: '',
                    companyType: '',
                    textarea: ''
                },
                imageArr: [
                    {
                        title: '添加现场图片',
                        files: [],
                        deelFiles: [],
                    },
                    {
                        title: '身份证图片',
                        files: [],
                        deelFiles: [],
                    }
                ]
            }
        },
        components: {
            MxSelect,
            MxUploader
        },
        methods: {
            selectEnd(val) {
                this.info.companyType = val
            },
            cancel() {
                this.$router.go(-1)
            },
            commit() {
//                for (let i = 0; i < 5; i++) {
//                    var validFlag = this.$refs['input' + i].valid
//                    if (!validFlag) {
//                        this.$dialog.toast({
//                            mes: this.$refs['input' + i].errorMsg,
//                            timeout: 500
//                        });
//                        return;
//                    }
//                }

                // this.$dialog.loading.open('发送中')

                if (this.files.length) {
                    this.submit()

                    this.$on('uploadend', function (data) {
                        // 发送请求（有图片的情况下）
                    })
                } else {
                    // 发送（无图片）
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
