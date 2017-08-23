<template>
    <div class="out-con">
        <yd-navbar
            :title="this.$route.meta.title"
            color="#fff"
            fontsize=".36rem"
        ></yd-navbar>

        <div class="logo-con">
            <img src="../../common/images/ic_small_logo@3x.png"/>
        </div>

        <div class="main-con">
            <yd-cell-group>
                <yd-cell-item>
                    <input type="text" slot="right" placeholder="请输入手机号">

                </yd-cell-item>
                <yd-cell-item>
                    <input type="text" slot="right" placeholder="请输入验证码">

                    <yd-sendcode slot="right"
                                 v-model="start1"
                                 @click.native="sendCode1"
                                 type="hollow"
                                 initStr="获取验证码"
                                 color="#00A7A3"
                                 style="font-size: .28rem"
                    ></yd-sendcode>

                </yd-cell-item>
                <yd-button class="logo-btn" size="large" type="primary" bgcolor="#00A7A3" color="#fff">登录</yd-button>
            </yd-cell-group>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                start1: false
            }
        },
        components: {},
        methods: {
            sendCode1() {
                this.$dialog.loading.open('发送中...');
                setTimeout(() => {

                    this.start = true;
                    this.$dialog.loading.close();

                    this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
                    });

                }, 1000);
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
