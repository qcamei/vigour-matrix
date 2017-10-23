<!--<mx-select-->
    <!--label="发票"-->
    <!--:chooseList="billList"-->
    <!--defaultValue="不开票"-->
    <!--@selectEnd="selectBill"-->
<!--&gt;</mx-select>-->

<template>
    <div id="select">
        <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">{{ label }}</span>
                <span class="a123" slot="right" @click="flag = true">{{ selectValue }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-actionsheet :items="callback" v-model="flag"></yd-actionsheet>
    </div>
</template>
<script>
    import {ActionSheet} from 'vue-ydui/dist/lib.rem/actionsheet'

    export default {
        props: {
            label: {
                type: String,
                required: true
            },
            selectId: {
                type: Number,
                required: true
            },
            chooseList: {
                type: Array,
                required: true
            },
            defaultValue: {
                type: String,
                required: true
            }
        },
        computed: {
            callback() {
                return this.chooseList.map(item => (
                        {
                            label: item.name,
                            method: select => {
                                this.selectValue = select.label
                                this.$emit('selectEnd', this.selectValue, this.selectId)
                            }
                        }
                    )
                )
            }
        },
        data() {
            return {
                flag: false,
                selectValue: this.defaultValue,
            }
        },
        components: {
            [ActionSheet.name]: ActionSheet
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    input
        text-align right
        font-size .26rem

    span
        font-size .26rem
        color #24242c

    .a123
        width 100%
        height 100%
        line-height 1rem
        display inline-block
</style>
