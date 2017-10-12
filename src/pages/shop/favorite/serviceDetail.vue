<template>
    <div>
        <yd-slider autoplay="3000">
            <yd-slider-item>
                <a href="http://www.ydcss.com">
                    <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
                </a>
            </yd-slider-item>
            <yd-slider-item>
                <a href="http://www.ydcss.com">
                    <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
                </a>
            </yd-slider-item>
            <yd-slider-item>
                <a href="http://www.ydcss.com">
                    <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
                </a>
            </yd-slider-item>
        </yd-slider>
    </div>
</template>
<script>
    import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider'

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {}
        },
        components: {
            [Slider.name]: Slider,
            [SliderItem.name]: SliderItem
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
