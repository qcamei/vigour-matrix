<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">联系人</span>
                <yd-input
                    slot="right"
                    ref="input0"
                    v-model="postInfo.contacts"
                    required
                    placeholder="请输入联系人姓名"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系电话</span>
                <yd-input
                    slot="right"
                    ref="input1"
                    type="number"
                    v-model="postInfo.phone"
                    regex="mobile"
                    required
                    placeholder="请输入联系电话"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">位置</span>
                <yd-input
                    slot="right"
                    ref="input2"
                    v-model="postInfo.position"
                    required
                    placeholder="请输入位置"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">设备类型</span>
                <yd-input
                    slot="right"
                    v-model="postInfo.deviceType"
                    placeholder="请输入设备类型"
                ></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="详细描述">
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入详细描述" maxlength="140" ref="textarea"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <!-- 图片上传 -->
        <div class="photo-tit">
            <span class="text1">添加现场图片</span>
            <span class="text2">（最多支持上传三张图片）</span>
        </div>
        <div class="vue-uploader">
            <div class="file-list">
                <section v-for="(file, index) in files" class="file-item draggable-item">
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
            <yd-button @click.native="cancel" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3"
                       style="border: 1px solid #e7e7e7">取消
            </yd-button>
            <yd-button @click.native="commit" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">提交
            </yd-button>
        </div>
    </div>
</template>
<script>
    import {newPostReport} from '../../api/api'

    export default {
        data() {
            return {
                postInfo: {
                    contacts: '',
                    phone: '',
                    position: '',
                    deviceType: '',
                },
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
            cancel() {
                this.$router.go(-1)
            },
            commit() {
                for (let i = 0; i < 3; i++) {
                    var validFlag = this.$refs['input' + i].valid
                    if (!validFlag) {
                        this.$dialog.toast({
                            mes: this.$refs['input' + i].errorMsg,
                            timeout: 800
                        });
                        return;
                    }
                }

                if (this.files.length) {
                    this.submit()

                    this.$on('uploadend', function (data) {
                        newPostReport({
                            ...this.postInfo,
                            description: this.$refs.textarea.$el.firstChild.value,
                            imageInfoList: data.map(item => {
                                return {path: item}
                            })
                        })
                            .then(res => {
                                if (res.body.code == 200) {
                                    this.$dialog.toast({
                                        mes: '申报成功',
                                        timeout: 500,
                                        callback: () => {
                                            this.$router.replace('/report/history')
                                        }
                                    })
                                }
                            })
                    })
                } else {
                    newPostReport({
                        ...this.postInfo,
                        description: this.$refs.textarea.$el.firstChild.value,
                    })
                        .then(res => {
                            if (res.body.code == 200) {
                                this.$dialog.toast({
                                    mes: '申报成功',
                                    timeout: 500,
                                    callback: () => {
                                        this.$router.replace('/report/history')
                                    }
                                })
                            }
                        })
                }
            }
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
            span
                font-size .26rem
                color #24242c
        .photo-tit
            font-size .3rem
            padding 0 .2rem
            .text1
                color #333
            .text2
                color #3f3f3f
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
</style>
