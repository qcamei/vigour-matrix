<template>
    <div>
        <!--<yd-navbar-->
            <!--:title="this.$route.meta.title"-->
            <!--color="#fff"-->
            <!--fontsize=".36rem">-->
            <!--<span v-show="this.$route.meta.backIcon" slot="left" @click="jumpback" style="width: .9rem; height: .9rem; line-height: .9rem;display: inline-block">-->
                <!--<yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>-->
            <!--</span>-->
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

</style>
