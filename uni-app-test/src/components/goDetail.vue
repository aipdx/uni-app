<template>
  <view @click="handleLink">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: "goDetail",
    props:{
      index: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      handleLink() {
        // 将数据缓存
        getApp().globalData.imgList = this.list
        getApp().globalData.imgIndex = this.index
        uni.navigateTo({
          url: '/pages/imgDetail/index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>