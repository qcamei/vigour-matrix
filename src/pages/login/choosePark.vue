<template>
    <div>
        <!--<yd-navbar-->
            <!--:title="this.$route.meta.title"-->
            <!--color="#fff"-->
            <!--fontsize=".36rem"-->
        <!--&gt;</yd-navbar>-->

        <yd-cell-group v-for="(item, idx) in newCompanyArr" :key="idx">
            <yd-cell-item>
                <span slot="left">所属园区</span>
                <span slot="right">{{ item.parkName }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">企业名称</span>
                <span slot="right">{{ item.enterpriseName }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">用户名</span>
                <span slot="right">{{ item.userName }}</span>
            </yd-cell-item>
            <div class="cell-item choose-btn-con">
                <yd-button type="primary" @click.native="chooseLogin(item.tempTokenKey)">选择登录</yd-button>
            </div>
        </yd-cell-group>
    </div>
</template>
<script>
    import { chooseAndBind } from '../../api/api'
    import { getUrlparams } from '../../common/js/utils'

    export default {
        created() {
            document.title = '绑定用户'
            this.hasBindCompany = JSON.parse(sessionStorage.getItem('hasBindCompany'))
            this.type = sessionStorage.getItem('redirectType')
        },
        watch: {
            hasBindCompany(newArr, oldArr) {
                this.newCompanyArr = newArr
            }
        },
        data() {
            return {
                hasBindCompany: [],
                newCompanyArr: [],
                type: ''
            }
        },
        components: {},
        methods: {
            chooseLogin(tempTokenKey) {
                chooseAndBind(tempTokenKey).then(res => {
                    if (res.body.code == 200) {
                        this.switchRedirect()
                    }
                })
            },
            switchRedirect() {
                switch (this.type) {
                    case '1':
                        this.$router.replace('/report/history')
                        break;
                    case '2':
                        this.$router.replace('/meeting/list')
                        break;
                    case '3':
                        this.$router.replace('/community/list')
                        break;
                    case '4':
                        this.$router.replace('/bill/list')
                        break;
                    case '5':
                        this.$router.replace('/shop/home')
                        break;
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .choose-btn-con
        height 1.12rem
        display flex
        align-items center
        justify-content center
        .btn
            width 2rem
            height .72rem
            background-color transparent
            color #00a7a3
            border: 1px solid #00a7a3
            font-size .30rem
</style>
