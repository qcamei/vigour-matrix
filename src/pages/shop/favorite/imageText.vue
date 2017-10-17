<template>
    <div>tuwen</div>
</template>
<script>
    export default {
        created() {
            document.title = this.$route.meta.title
            console.log(this.$route.params.id)
        },
        data() {
            return {}
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
