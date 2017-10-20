<template>
    <div id="invoiceInfo">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">联系人：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.contacts"
                    placeholder="请输入联系人姓名"
                    ref="input0"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号码：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.phone"
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
                    v-model="newDistricts"
                    readonly
                    placeholder="请选择地区"
                />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">详细地址：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.addr"
                    placeholder="请输入详细地址"
                    ref="input2"
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
            >确认修改</yd-button>
        </div>

        <yd-cityselect v-model="showCity" :callback="selectCallback" :items="district"></yd-cityselect>
    </div>
</template>
<script>
    import { CitySelect } from 'vue-ydui/dist/lib.rem/cityselect'
    import District from 'ydui-district/dist/jd_province_city_area_id'
    import { getMyAddressSingle, editAddress } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
            getMyAddressSingle(this.$route.params.id).then(response => {
                if (response.body.code == 200) {
                    this.info = response.body.data
                    console.log(this.info)
                }
            })
        },
        computed: {
            newDistricts() {
                return this.info.proviceName + ' ' + this.info.cityName + ' ' + this.info.countyName
            }
        },
        data() {
            return {
                info: {
                    contacts: '',
                    phone: '',
                    districts: '湖北省 随州市 曾都区',
                    addr: '',
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
                for (let i = 0; i < 3; i++) {
                    var validFlag = this.$refs['input' + i].valid
                    if (!validFlag) {
                        this.$dialog.toast({
                            mes: this.$refs['input' + i].errorMsg,
                            timeout: 500
                        });
                        return;
                    }
                }

                const postInfo = {
                    contacts: this.info.contacts,
                    phone: this.info.phone,
                    addr: this.info.addr,
                    isDefault: true
                }

                this.newDistricts.split(' ').forEach((item,idx) => {
                    idx === 0 ? postInfo.proviceName = item : void 0;
                    idx === 1 ? postInfo.cityName = item : void 0;
                    idx === 2 ? postInfo.countyName = item : void 0;
                })

                editAddress(postInfo, this.$route.params.id).then(response => {
                    if (response.body.code == 200) {
                        this.$router.replace('/shop/myAddress')
                    }
                })
            },
            selectCallback(ret) {
                this.info.proviceName = ret.itemName1
                this.info.cityName = ret.itemName2
                this.info.countyName = ret.itemName3
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
