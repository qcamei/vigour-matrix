<template>
    <div class="left-delete">
        <div class="move"
             @touchstart="_touchStart"
             @touchmove="_touchMove"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot></slot>
        </div>
        <div class="deleteIcon" :style="deleteStyles" @click.stop.prevent="deleteItem(itemId)">
            <yd-icon name="delete" color="#fff"></yd-icon>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            itemId: Number,
            deleteStyles: String
        },
        data() {
            return {
                startX: 0,       //触摸位置
                moveX: 0,       //滑动时的位置
                disX: 0,       //移动距离
                txtStyle: '',
                delWidth: 200,
                top: '',
            }
        },
        methods: {
            _touchStart: function (ev) {
                ev = ev || event;
                if (ev.touches.length == 1) {
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    console.log(this.startX)
                }
            },
            _touchMove: function (ev) {
                ev = ev || event;
                if (ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // console.log('disX==>',this.disX)
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if (this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "transform:translateX(0rem)";
                    } else if (this.disX > 0) {
                        this.txtStyle = "transform:translateX(-" + this.disX / 100 + "rem)";
                        if (this.disX >= this.delWidth / 100) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth / 100 + "rem)";
                            this.zIndex = "z-index:" + 10 + "rem";
                        }
                    }
                }
            },
            _touchEnd: function (event) {
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    console.log(event.changedTouches[0].clientX)
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            deleteItem: function (itemId) {
                this.$emit('deleteItem', itemId);
            }
        }
    }
</script>

<style>
    .left-delete {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
    }

    .move {
        position: relative;
        transition: all .5s;
        background-color: #fff;
    }

    .deleteIcon {
        width: 2rem;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #cd5c5c;
    }
</style>
