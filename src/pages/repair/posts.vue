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
                    ref="input3"
                    v-model="postInfo.deviceType"
                    required
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
        <ul class="upload-list">
            <li><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></li>
            <li><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></li>
            <li class="upload-btn" @click="addPic">
                +
                <input type="file" accept="image/*" style="display: none" ref="fileInput" @change="onFileChange"/>
            </li>
        </ul>

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
    export default {
        data() {
            return {
                postInfo: {
                    contacts: '',
                    phone: '',
                    position: '',
                    deviceType: ''
                },
                imgUrls: []
            }
        },
        components: {},
        methods: {
            cancel() {
                this.$router.go(-1)
            },
            commit() {
                for (let i = 0; i < 4; i++) {
                    var validFlag = this.$refs['input' + i].valid
                    if (!validFlag) {
                        this.$dialog.toast({
                            mes: this.$refs['input' + i].errorMsg,
                            timeout: 800
                        });
                        return;
                    }
                }
                console.log(this.$refs.textarea.$el.firstChild.value)
            },
            addPic() {
                this.$refs.fileInput.click()
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files
                console.log(files);
                if (!files.length) return
            },
            createImage(file, e) {

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
        .upload-list
            display flex
            justify-content space-around
            margin-top .35rem
            li
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
            .upload-btn
                display flex
                justify-content center
                align-items center
                box-sizing border-box
                background-color #fff
                border 1px dashed #979797
                color #979797
                font-size .8rem
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
