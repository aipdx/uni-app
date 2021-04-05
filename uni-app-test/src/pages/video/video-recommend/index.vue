<template>
  <scroll-view @scrolltolower="handleToLower" scroll-y class="recommend_scroll">
    <view class="video_wrap">
      <view
        @click="handleGoVideo(item)"
        v-for="item in videoList"
        :key="item.id"
        class="video_item">
        <image mode="aspectFill" :src="item.img"></image>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  import {getVideo} from '../../../api/video'
  export default {
    name: "index",
    data() {
      return {
        params: {
          limit: 30,
          order: 'hot',
          skip: 0
        },
        hasMore: true,
        videoList: []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        getVideo(this.params).then(res => {
          if (res.videowp.length === 0) {
            return
          }
          this.videoList = [...this.videoList, ...res.videowp]
        })
      },
      handleToLower() {
        if (this.hasMore) {
          this.params.skip += this.params.limit
          this.getData()
        } else {
          uni.showToast({
            title: '没有数据了',
            icon: 'none'
          })
        }
      },
      handleGoVideo(item) {
        getApp().globalData.video = item
        uni.navigateTo({
          url: '/pages/videoDetail/index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .recommend_scroll {
    height: calc(100vh - 36px);
  }
.video_wrap {
  display: flex;
  flex-wrap: wrap;
  .video_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    image {
      height: 240rpx;
    }
  }
}
</style>