<template>
    <div>
        <yd-cell-group v-for="(item, idx) in parkArr" :key="idx">
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
    import { getUsersCompany, chooseAndBind } from '../../api/api'

    export default {
        created() {
            getUsersCompany().then(res => {
                if (res.body.code == 200) {
                    this.parkArr = res.body.data
                }
            })
        },
        data() {
            return {
                parkArr: []
            }
        },
        components: {},
        methods: {
            chooseLogin(tempTokenKey) {
                chooseAndBind(tempTokenKey).then(res => {
                    if (res.body.code == 200) {
                        this.$router.replace('/bill/list')
                    }
                })
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
