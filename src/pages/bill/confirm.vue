<template>
    <div id="bill-confirm" style="padding-bottom: 1.4rem">
        <div class="tooltip">
            <span class="tip">
                <div class="icon-con"><i class="max max-attention"></i></div>
                <span>若账单已支付,请务必填写支付流水号或上传相关支付凭证</span>
            </span>
        </div>

        <yd-cell-item>
            <span slot="left" style="font-size: .26rem">日期</span>
            <input
                slot="right"
                v-model="datetime"
                style="color: #333; text-align: right"
                readonly/>
        </yd-cell-item>

        <yd-cell-item style="background-color: #fff">
            <span slot="left" style="font-size: .26rem">支付流水号</span>
            <input
                slot="right"
                v-model="paySerialNumber"
                style="color: #333; text-align: right; font-size: .26rem; padding: 0 0 0 .2rem"
                ref="input0"
                placeholder="请按照支付银行+支付流水号格式输入"
            />
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left" style="font-size: .26rem">支付凭证<span style="color: #3f3f3f">(最多支持上传三张图片)</span></span>
        </yd-cell-item>

        <div class="vue-uploader">
            <div class="file-list">
                <section v-for="(file, index) in files" :key="index" class="file-item draggable-item">
                    <img :src="file.src" alt="" ondragstart="return false;">
                    <span class="file-remove" @click="remove(index)">+</span>
                </section>
                <section v-if="files.length < 3" class="file-item">
                    <div @click="add" class="add">
                        <span>+</span>
                    </div>
                </section>
            </div>

            <section v-if="files.length != 0" class="upload-func">
                <div class="progress-bar">
                    <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
                </div>
                <div class="operation-box" v-if="false">
                    <button v-if="status == 'ready'" @click="submit">上传</button>
                    <button v-if="status == 'finished'" @click="finished">完成</button>
                </div>
            </section>
            <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
        </div>

        <div class="posts-btn-con">
            <yd-button @click.native="commit" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">确认
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { commitPayCertificate, getBillDetail } from '../../api/api'

    export default {
        created() {
            document.title = '账单支付确认'
            getBillDetail(this.$route.params.billId)
                .then(res => {
                    console.log(res.body)
                    if (res.body.code == 200) {
                        this.datetime = res.body.data.billMonthShow
                    }
                })
        },
        data() {
            return {
                datetime: '',
                paySerialNumber: '',
                status: 'ready',
                files: [],
                point: {},
                uploading: false,
                percent: 0,
            }
        },
        components: {},
        methods: {
            add() {
                this.$refs.file.click()
            },
            submit() {
                var _this = this
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                const formData = new FormData()
                this.files.forEach((item) => {
                    formData.append(item.name, item.file)
                })
                const xhr = new XMLHttpRequest()
                xhr.upload.addEventListener('progress', this.uploadProgress, false)
                xhr.open('POST', '/platform/image', true)
                this.uploading = true
                xhr.send(formData)
                xhr.responseType = 'json'
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        this.status = 'finished'
                        console.log('upload success!')
                        _this.$emit('uploadend', xhr.response.data)
                    } else {
                        console.log(`error：error code ${xhr.status}`)
                    }
                }
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1)
            },
            fileChanged() {
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.files.push(item)
                    }
                }
                this.$refs.file.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
                this.files.forEach((item) => {
                    if (item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            },
            commit() {
                for (let i = 0; i < 1; i++) {
                    var validFlag = this.$refs['input' + i].valid || this.files.length;
                    if (!validFlag) {
                        this.$dialog.toast({
                            mes: '至少填写一项',
                            timeout: 500
                        });
                        return;
                    }
                }

                this.$dialog.loading.open('发送中')

                if (this.files.length) {
                    this.submit()

                    this.$on('uploadend', function (data) {

                        commitPayCertificate(this.$route.params.billId, {
                            paySerialNumber: this.paySerialNumber,
                            bpvs: data.map(item => {
                                return {fileUrl: item}
                            })
                        })
                            .then(res => {
                                if (res.body.code == 200) {
                                    this.$dialog.loading.close()
                                    this.$dialog.toast({
                                        mes: '提交成功',
                                        timeout: 500,
                                        callback: () => {
                                            this.$router.replace('/bill/list')
                                        }
                                    })
                                } else {
                                    this.$dialog.loading.close()
                                    this.$dialog.toast({
                                        mes: res.body.message,
                                        timeout: 800,
                                        callback: () => {
                                            this.$router.replace('/bill/list')
                                        }
                                    })
                                }
                            })
                            .catch(e => {
                                this.$dialog.loading.close()
                                this.$dialog.toast({
                                    mes: '服务器错误',
                                    timeout: 500
                                })
                            })
                    })
                } else {
                    commitPayCertificate(this.$route.params.billId, {
                        paySerialNumber: this.paySerialNumber
                    })
                        .then(res => {
                            if (res.body.code == 200) {
                                this.$dialog.loading.close()
                                this.$dialog.toast({
                                    mes: '申报成功',
                                    timeout: 500,
                                    callback: () => {
                                        this.$router.replace('/bill/list')
                                    }
                                })
                            } else {
                                this.$dialog.loading.close()
                                this.$dialog.toast({
                                    mes: res.body.message,
                                    timeout: 800,
                                    callback: () => {
                                        this.$router.replace('/bill/list')
                                    }
                                })
                            }
                        })
                        .catch(e => {
                            this.$dialog.loading.close()
                            this.$dialog.toast({
                                mes: '服务器错误',
                                timeout: 500
                            })
                        })
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .tooltip
        width 100%
        height .8rem
        background-color #ee8f2b
        color #fff
        font-size .26rem
        display flex
        align-items center
        justify-content flex-start
        .tip
            display flex
            align-items center
            .icon-con
                width .64rem
                text-align center
                .max
                    display inline-block
                    width .4rem
                    height .4rem
                    background-repeat no-repeat
                    background-size .4rem .4rem
                .max-attention
                    background-image url("../../common/images/ic_attention.png")

    .vue-uploader
        .file-list
            display flex
            justify-content space-around
            margin-top .35rem
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
        .upload-func
            display: flex;
            margin: .2rem;
            background: #f8f8f8;
            border-top: 1px solid #ececec;
            .progress-bar
                flex-grow: 1;
                section
                    background: #00b4aa;
                    border-radius: 3px;
                    text-align: center;
                    color: #fff;
                    font-size: 12px;
                    transition: all .5s ease;

    .posts-btn-con
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
            height .8rem
            margin 0
            font-size .28rem
</style>
