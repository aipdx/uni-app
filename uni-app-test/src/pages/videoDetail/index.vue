<template>
  <view class="video_detail_wrap">
    <image class="video_bg" :src="videoObj.img"></image>
    <view class="video_inner">
      <view class="icon_wrap">
        <view
          @click="muted=!muted"
          :class="['voice_icon iconfont', muted?'icon-jingyin':'icon-volume']"
         >
        </view>
        <view class="share_icon iconfont icon-zhuanfa">
          <button open-type="share"></button>
        </view>
      </view>
      <view class="video_wrap">
        <view class="video_item">
          <!--objectFit="fill":视频拉伸-->
          <video
            :muted="muted"
            :src="videoObj.video"
            objectFit="fill">
          </video>
        </view>
        <view @click="downloadVideo" class="download_item">
          下载高清
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        videoObj: {},
        muted: false, // 是否静音
      }
    },
    onLoad() {
      this.videoObj = getApp().globalData.video
      console.log(getApp().globalData.video)
    },
    methods: {
      async downloadVideo() {
        await uni.showLoading({title: '下载中'})
        // 将远程文件下载到小程序内存中
        const { tempFilePath } = (await uni.downloadFile({url: this.videoObj.video}))[1]
        // 将内存中的文件下载到本地
        await uni.saveVideoToPhotosAlbum({
          filePath: tempFilePath
        })
        uni.hideLoading()
        await uni.showToast({
          title: '下载成功'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.video_detail_wrap {
  padding: 20rpx;
  position: relative;
  .video_bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    filter: blur(20px);
  }
  .icon_wrap {
    display: flex;
    justify-content: flex-end;
    .iconfont {
      width: 80rpx;
      height: 80rpx;
      background: rgba(0,0,0,.3);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      border-radius: 50%;
      font-size: 40rpx;
    }
    .share_icon {
      margin-left: 20rpx;
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .video_wrap {
    padding: 20rpx 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .video_item {
      width: 360rpx;
      height: 600rpx;
      padding-bottom: 20rpx;
      display: flex;
      justify-content: center;
      video {
        width: 100%;
        height: 100%;
      }
    }
    .download_item {
      width: 360rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      background: rgba(0,0,0,.3);
      border: 1px solid #ffffff;
      border-radius: 30rpx;
      padding: 10rpx;
    }
  }
}
</style>