<template>
    <div class="out-con">
        <!--<yd-navbar-->
            <!--:title="this.$route.meta.title"-->
            <!--color="#fff"-->
            <!--fontsize=".36rem"-->
        <!--&gt;</yd-navbar>-->

        <div class="logo-con">
            <img src="../../common/images/ic_small_logo@3x.png"/>
        </div>

        <div class="main-con">
            <yd-cell-group>
                <yd-cell-item>
                    <input type="number" slot="right" placeholder="请输入手机号" v-model="info.cellPhone">

                </yd-cell-item>
                <yd-cell-item>
                    <input type="number" slot="right" placeholder="请输入验证码" v-model="info.phoneCode">

                    <yd-sendcode slot="right"
                                 v-model="start1"
                                 @click.native="sendCode"
                                 type="hollow"
                                 :initStr="btnText"
                                 color="#00A7A3"
                                 style="font-size: .28rem"
                    ></yd-sendcode>

                </yd-cell-item>
                <yd-button class="logo-btn" size="large" type="primary" bgcolor="#00A7A3" color="#fff"
                           @click.native="login">登录
                </yd-button>
            </yd-cell-group>
        </div>
    </div>
</template>
<script>
    import { sendValidCode, toLogin, justBindPhone } from '../../api/api'
    import { getUrlparams } from '../../common/js/utils'

    export default {
        created() {
            document.title = '登录'
            this.type = getUrlparams().type
            this.parkCode = getUrlparams().parkCode
            this.code = getUrlparams().code
        },
        data() {
            return {
                start1: false,
                info: {
                    cellPhone: '',
                    phoneCode: ''
                },
                $timer: null,
                btnText: '获取验证码',
                type: '',
                parkCode: '',
                code: ''
            }
        },
        components: {},
        methods: {
            sendCode() {
                if (!/^1[34578]\d{9}$/.test(this.info.cellPhone)) {
                    this.$dialog.toast({mes: '请输入正确的手机号', long: 500});
                    return
                }

                this.$dialog.loading.open('发送中...')

                sendValidCode(this.info.cellPhone).then(res => {
                    if (res.body.code == 200) {
                        this.start1 = true
                        this.$dialog.loading.close()

                        this.$dialog.toast({
                            mes: '已发送',
                            icon: 'success',
                            timeout: 500
                        });
                    } else {
                        this.$dialog.toast({
                            mes: res.body.message,
                            timeout: 500
                        });
                        this.$dialog.loading.close()
                    }
                })
            },
            login() {
                if (!/^1[34578]\d{9}$/.test(this.info.cellPhone)) {
                    this.$dialog.toast({mes: '请输入正确的手机号', timeout: 500});
                    return
                }
                if (!this.info.phoneCode) {
                    this.$dialog.toast({mes: '验证码不能为空', timeout: 500});
                    return
                }
                if (this.info.phoneCode.length !== 4) {
                    this.$dialog.toast({mes: '请输入4位数验证码', timeout: 500});
                    return
                }

                toLogin({
                    cellphone: this.info.cellPhone,
                    phoneCode: this.info.phoneCode
                }).then(res => {
                    var result = res.body
                    if (result.code == 200) {
                        if (result.data && result.data.length === 0) {
                            // 手机号没有绑定过园区，直接绑定当前园区后登录
                            justBindPhone({
                                phone: this.info.cellPhone
                            }).then(res => {
                                if (res.body.code == 200) {
                                    this.$dialog.toast({mes: '绑定成功', timeout: 500})
                                    this.switchRedirect()
                                } else {
                                    this.$dialog.toast({mes: res.body.message, timeout: 500})
                                }
                            })
                        } else if (result.data && result.data.length > 0) {
                            // 手机号绑定过园区，进入选择园区登录
                            window.sessionStorage.setItem('hasBindCompany', JSON.stringify(result.data))
                            this.switchRedirectInSession()
                            setTimeout(() => this.$router.push('/choose-park'), 300)
                        }
                    }
                }).catch(e => console.log(e))
            },
            switchRedirect() {
                switch (this.type) {
                    case 'report':
                        this.$router.replace('/report/history')
                        break;
                    case 'metting':
                        this.$router.replace('/meeting/list')
                        break;
                    case 'community':
                        this.$router.replace('/community/list')
                        break;
                    case 'bill':
                        this.$router.replace('/bill/unbound')
                        break;
                }
            },
            switchRedirectInSession() {
                switch (this.type) {
                    case 'report':
                        window.sessionStorage.setItem('redirectType', '1')
                        break;
                    case 'metting':
                        window.sessionStorage.setItem('redirectType', '2')
                        break;
                    case 'community':
                        window.sessionStorage.setItem('redirectType', '3')
                        break;
                    case 'bill':
                        window.sessionStorage.setItem('redirectType', '4')
                        break;
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .out-con
        height 100%
        background #fff !important

    .m-cell:after
        border-bottom 1px solid #111 !important

    .hairline .btn-hollow
        border none

    .logo-con
        width 100%
        height 3.5rem
        display flex
        align-items center
        justify-content center
        img
            width 4.4rem
            height 1rem

    .main-con
        padding 0 .2rem
        .logo-btn
            font-size .30rem
            font-weight 500
            height .8rem
</style>
