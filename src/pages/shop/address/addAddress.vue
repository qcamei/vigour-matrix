<template>
    <div id="invoiceInfo">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">联系人：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.name1"
                    placeholder="请输入联系人姓名"
                    ref="input0"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号码：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.name2"
                    regex="mobile"
                    placeholder="请输入手机号码"
                    ref="input1"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">选择地区：</span>
                <input
                    slot="right"
                    type="text"
                    @click.stop="showCity = true"
                    v-model="info.name3"
                    readonly
                    placeholder="请选择地区"
                    ref="input2"
                />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">详细地址：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.name4"
                    placeholder="请输入详细地址"
                    ref="input3"
                ></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <!--保存-->
        <div class="posts-btn-con">
            <yd-button
                @click.native="saveAddress"
                class="posts-btn"
                type="primary"
                bgcolor="#00A7A3"
                color="#fff"
                style="width: 100%"
            >确定</yd-button>
        </div>

        <yd-cityselect v-model="showCity" :callback="selectCallback" :items="district"></yd-cityselect>
    </div>
</template>
<script>
    import { CitySelect } from 'vue-ydui/dist/lib.rem/cityselect'
    import District from 'ydui-district/dist/jd_province_city_area_id'

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {
                info: {
                    name1: '',
                    name2: '',
                    name3: '',
                    name4: '',
                },
                showCity: false,
                district: District
            }
        },
        components: {
            [CitySelect.name]: CitySelect
        },
        methods: {
            saveAddress() {
                for (let i = 0; i < 4; i++) {
                    var validFlag = this.$refs['input' + i].valid
                    if (!validFlag) {
                        this.$dialog.toast({
                            mes: this.$refs['input' + i].errorMsg,
                            timeout: 500
                        });
                        return;
                    }
                }
            },
            selectCallback(ret) {
                this.info.name3 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    span
        font-size .26rem
    .posts-btn-con
        display flex
        justify-content space-around
        align-items center
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        z-index 10
        .posts-btn
            width 3.45rem
            height .8rem
            margin 0
            font-size .28rem
            padding 0
            box-sizing border-box
</style>
