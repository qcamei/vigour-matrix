<template>
    <div>
        <!--<yd-navbar-->
            <!--:title="this.$route.meta.title"-->
            <!--color="#fff"-->
            <!--fontsize=".36rem">-->
            <!--<span v-show="this.$route.meta.backIcon" slot="left" @click="jumpback" style="width: .9rem; height: .9rem; line-height: .9rem;display: inline-block">-->
                <!--<yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>-->
            <!--</span>-->
            <!--<router-link to="/report/posts" slot="right" v-if="this.$route.meta.addReport">-->
                <!--<i class="max max-add"></i>-->
            <!--</router-link>-->
        <!--</yd-navbar>-->

        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        components: {},
        methods: {
            jumpback() {
                this.$router.go(-1)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .max
        width .48rem
        height .48rem
        background-repeat no-repeat
        background-size .48rem .48rem
    .max-add
        background-image url("../../common/images/ic_add.png")
</style>
