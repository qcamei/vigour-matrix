<template>
    <div id="apply-con">
        <div class="title">{{ infos.title }}</div>

        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">联系人</span>
                <yd-input
                    slot="right"
                    ref="input0"
                    v-model="infos.contact"
                    required
                    placeholder="请输入联系人姓名"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号码</span>
                <yd-input
                    slot="right"
                    ref="input1"
                    type="number"
                    v-model="infos.phone"
                    regex="mobile"
                    required
                    placeholder="请输入联系人手机号"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">公司名称</span>
                <yd-input
                    slot="right"
                    ref="input2"
                    v-model="infos.company"
                    required
                    placeholder="请输入公司名称"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">职务</span>
                <yd-input
                    slot="right"
                    ref="input3"
                    v-model="infos.job"
                    required
                    placeholder="请输入职务"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">人数</span>
                <yd-input
                    slot="right"
                    ref="input4"
                    type="number"
                    v-model="infos.count"
                    required
                    regex="^\+?[1-9]\d*$"
                    placeholder="请输入人数"
                ></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="备注">
            <yd-cell-item>
                <yd-textarea ref="textarea" slot="right" placeholder="请输入详细描述" maxlength="140"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

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
                infos: {
                    id: 1,
                    title: '上海秋季全程马拉松赛',
                    contact: '',
                    phone: '',
                    company: '',
                    job: '',
                    count: ''
                }
            }
        },
        components: {},
        methods: {
            cancel() {
                this.$router.go(-1)
            },
            commit() {
                for (let i = 0; i < 5; i++) {
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
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #apply-con
        padding-bottom 1.4rem
        .title
            height 1.22rem
            line-height 1.22rem
            text-align center
            font-size .3rem
            color #00a7a3
        #input-group
            input
                text-align right
                font-size .26rem
            span
                font-size .26rem
                color #24242c
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
