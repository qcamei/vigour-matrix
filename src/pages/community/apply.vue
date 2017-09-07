<template>
    <div id="apply-con">
        <div class="title">{{ title }}</div>

        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">联系人</span>
                <yd-input
                    slot="right"
                    ref="input0"
                    v-model="infos.proprser"
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
                    v-model="infos.phone"
                    regex="mobile"
                    required
                    placeholder="请输入联系人联系电话"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">公司名称</span>
                <yd-input
                    slot="right"
                    v-model="infos.companyName"
                    placeholder="请输入公司名称"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">职务</span>
                <yd-input
                    slot="right"
                    v-model="infos.position"
                    placeholder="请输入职务"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">人数</span>
                <yd-input
                    slot="right"
                    type="number"
                    v-model="infos.num"
                    ref="input2"
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
    import { getCommunityDetail, commitCommunityPosts } from '../../api/api'

    export default {
        created() {
            document.title = '参加活动申请'
            getCommunityDetail(this.$route.params.eventId).then(res => {
                this.infos.communityId = res.body.data.id
                this.title = res.body.data.title
            })
        },
        data() {
            return {
                infos: {
                    communityId: '',
                    proprser: '',
                    phone: '',
                    num: '',
                    describle: '',
                    companyName: '',
                    position: ''
                },
                title: '',
            }
        },
        components: {},
        methods: {
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

                this.$dialog.loading.open('发送中')

                this.infos.describle = this.$refs.textarea.$el.firstChild.value

                commitCommunityPosts(this.infos)
                    .then(res => {
                        if (res.body.code == 200) {
                            this.$dialog.loading.close()
                            this.$dialog.toast({
                                mes: '申请成功',
                                timeout: 800,
                                callback: () => {
                                    this.$router.replace('/community/list')
                                }
                            })
                        } else {
                            this.$dialog.loading.close()
                            this.$dialog.toast({
                                mes: res.body.message,
                                timeout: 800
                            })
                        }
                    })
                    .catch(e => console.log(e))
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #apply-con
        padding-bottom 1.4rem
        .title
            box-sizing border-box
            padding 0 .2rem
            height 1.22rem
            line-height 1.22rem
            text-align center
            font-size .3rem
            color #00a7a3
            width 100%
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
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
