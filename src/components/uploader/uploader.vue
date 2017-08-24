<template>
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

        <!--<section v-if="false" class="upload-func">-->
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
</template>
<script>
    export default {
        props: {
            src: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                status: 'ready',
                files: [],
                point: {},
                uploading: false,
                percent: 0
            }
        },
        methods: {
            add() {
                this.$refs.file.click()
            },
            submit() {
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
                xhr.open('POST', this.src, true)
                this.uploading = true
                xhr.send(formData)
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        this.status = 'finished'
                        console.log('upload success!')
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
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
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
            }
        }
    }
</script>
<style>
    .vue-uploader .file-list {
        display: flex;
        justify-content: space-around;
        margin-top: .35rem;
    }
    .vue-uploader .file-list .file-item {
        position: relative;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 2px;
        overflow: hidden;
    }
    .vue-uploader .file-list .file-item img{
        width: 100%;
        height: 100%;
        border: none;
        object-fit: cover;
    }
    .vue-uploader .file-list .file-item .file-remove {
        position: absolute;
        right: 0;
        top: 0;
        width: .4rem;
        height: .4rem;
        color: white;
        cursor: pointer;
        line-height: .4rem;
        border-radius: 100%;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        background: rgba(0, 0, 0, 0.5);
        font-size: .4rem;
        text-align: center;
        padding: 0;
        box-sizing: border-box;
    }
    .vue-uploader .file-list .file-item:hover .file-remove {
        display: inline;
    }
    .vue-uploader .add {
        width: 1.6rem;
        height: 1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px dashed #979797;
        color: #979797;
        font-size: .8rem;
    }
    .vue-uploader .upload-func {
        display: flex;
        padding: 10px;
        margin: 0px;
        background: #f8f8f8;
        border-top: 1px solid #ececec;
    }
    .vue-uploader .upload-func .progress-bar {
        flex-grow: 1;
    }
    .vue-uploader .upload-func .progress-bar section {
        margin-top: 5px;
        background: #00b4aa;
        border-radius: 3px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        transition: all .5s ease;
    }
    .vue-uploader .upload-func .operation-box {
        flex-grow: 0;
        padding-left: 10px;
    }
    .vue-uploader .upload-func .operation-box button {
        padding: 4px 12px;
        color: #fff;
        background: #007ACC;
        border: none;
        border-radius: 2px;
        cursor: pointer;
    }
    .vue-uploader > input[type="file"] {
        display: none;
    }
</style>
