<template>
    <div id="imageText" v-html="info.content" v-if="info"></div>
</template>
<script>
    import { getServiceDetail } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
            getServiceDetail(this.$route.params.id).then(response => {
                if (response.body.code == 200) {
                    this.info = response.body.data
                }
            })
        },
        data() {
            return {
                info: null
            }
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #imageText
        width 100%
        background-color #fff
        font-size .26rem
        padding .2rem .2rem 1.4rem
        overflow hidden
        img
            width 100% !important
</style>
