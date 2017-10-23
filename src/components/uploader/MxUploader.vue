<template>
    <div>
        <div class="photo-tit">
            <span class="text1">{{ title }}</span>
        </div>
        <div class="vue-uploader">
            <div class="file-list">
                <section v-for="(file, index) in files" class="file-item draggable-item">
                    <img :src="file.src" alt="" ondragstart="return false;">
                    <span class="file-remove" @click="remove(index)">+</span>
                </section>
                <section v-if="files.length < 1" class="file-item">
                    <div @click="add" class="add">
                        <span>+</span>
                    </div>
                </section>
            </div>
            <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            files: {
                type: Array,
                required: true
            },
            deelFiles: {
                type: Array,
                required: true
            },
            imageApi: {
                type: String,
                required: true
            },
            fileId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                formData: null
            }
        },
        components: {},
        methods: {
            add() {
                this.$refs.file.click()
            },
            deelImage(path, callback) {
                var img = new Image();
                img.src = path;
                img.onload = function () {
                    //默认按比例压缩
                    var w = this.width,
                        h = this.height;
                    var quality = 0.1; // 默认图片质量为0.5

                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');

                    // 创建属性节点
                    canvas.setAttribute("width", w);
                    canvas.setAttribute("height", h);

                    ctx.drawImage(this, 0, 0, w, h);
                    // quality值越小，所绘制出的图像越模糊
                    var base64 = canvas.toDataURL('image/jpeg', quality);
                    // 回调函数返回base64的值
                    callback(base64);
                };
            },
            dataURItoBlob(base64Data) {
                var byteString;
                if (base64Data.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(base64Data.split(',')[1]);
                else
                    byteString = unescape(base64Data.split(',')[1]);
                var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], {type: mimeString});
            },
            submit() {
                var _this = this
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                _this.formData = new FormData()
                this.deelFiles.forEach((item) => {
                    _this.formData.append(Math.random() + '', item)
                })
                console.log(this.files)
                const xhr = new XMLHttpRequest()
                xhr.open('POST', _this.imageApi, true)
                xhr.send(_this.formData)
                xhr.responseType = 'json'
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        this.status = 'finished'
                        console.log('upload success!')
                        _this.$emit('uploadend', xhr.response.data, _this.fileId)
                    } else {
                        console.log(`error：error code ${xhr.status}`)
                    }
                }
            },
            remove(index) {
                this.files.splice(index, 1)
                this.deelFiles.splice(index, 1)
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
                    this.deelImage(e.target.result, zippedSrc => {
                        this.$set(item, 'src', zippedSrc);
                        this.deelFiles.push(this.dataURItoBlob(zippedSrc))
                    })
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
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    span
        color #262626
        font-size .26rem
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
</style>
