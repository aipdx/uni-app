<template>
  <view>
    <!--作者信息-->
    <view class="auth_info_wrap">
      <view class="auth_photo">
        <image mode="widthFix" :src="list.user.avatar"></image>
      </view>
      <view class="auth_nickname">
        <view class="nickname_txt">{{list.user.name}}</view>
        <view class="time">2年前</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        list: {}
      }
    },
    onLoad() {
      let { imgList, imgIndex } = getApp().globalData
      this.list = imgList[imgIndex]
      console.log(this.list)
    },
  }
</script>

<style lang="scss" scoped>
.auth_info_wrap {
  padding: 40rpx 30rpx;
  display: flex;
  .auth_photo {
    width: 50rpx;
    height: 50rpx;
    overflow: hidden;
    border-radius: 50%;
  }
  .auth_nickname {
    margin-left: 15rpx;
    .nickname_txt {
      font-size: 34rpx;
      color: #333333;
      font-weight: bold;
    }
    .time {
      margin-top: 10rpx;
      color: #999999;
    }
  }
}
</style>