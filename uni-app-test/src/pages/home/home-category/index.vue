<template>
  <view>
    <view class="category_wrap">
      <view
        v-for="item in categoryList"
        class="category_item">
        <image mode="aspectFill" :src="item.cover"></image>
        <text>{{item.name}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {getCategory} from '../../../api/home'

  export default {
    data() {
      return {
        categoryList: []
      }
    },
    mounted() {
      // 修改页面标题
      uni.setNavigationBarTitle({title: '分类'})
      this.getCategoryList()
    },
    methods: {
      getCategoryList() {
        getCategory().then(res => {
          this.categoryList = res.category
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.category_wrap {
  display: flex;
  flex-wrap: wrap;
  .category_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    position: relative;
    image {

    }
    text {
      position: absolute;
      left: 20rpx;
      bottom: 10rpx;
      font-size: 30rpx;
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>