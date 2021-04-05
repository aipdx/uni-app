<template>
  <scroll-view @scrolltolower="handleToLower" scroll-y class="album_scroll">
    <!--轮播图-->
    <view class="swiper_wrap">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banners" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!--列表-->
    <view class="list_wrap">
      <navigator
        v-for="item in album"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
        class="list_item">
        <view class="img_l">
          <image mode="aspectFill" :src="item.cover"></image>
        </view>
        <view class="txt_l">
          <view class="txt_title">{{item.name}}</view>
          <view class="txt_content">{{item.desc}}</view>
          <view class="btn_wrap">
            <view class="btn_inner">+关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
  import {getAlbum} from '../../../api/home'

  export default {
    data() {
      return {
        params: {
          limit: 30,
          order: 'new',
          skip: 0
        },
        hasMore: true,
        banners: [],
        album: []
      }
    },
    mounted() {
      // 修改页面标题
      uni.setNavigationBarTitle({title: '专辑'})
      this.getAlbumList()
    },
    methods: {
      getAlbumList() {
        getAlbum(this.params).then(res => {
          if (this.banners.length === 0) {
            this.banners = res.banner
          }
          if (res.album.length === 0) {
            this.hasMore = false
            return
          }
          this.album = [...this.album, ...res.album]
        })
      },
      // 触底事件
      handleToLower() {
        if (this.hasMore) {
          this.params.skip += this.params.limit
          this.getAlbumList()
        } else {
          uni.showToast({
            title: '没有数据了',
            icon: 'none'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .album_scroll {
    height: calc(100vh - 36px);
  }
.swiper_wrap {
  swiper {
    /*2.3是图片的宽高比*/
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
  .list_wrap {
    padding: 20rpx 10rpx;
    .list_item {
      display: flex;
      padding: 20rpx 0;
      border-bottom: 1px solid #ececec;
      .img_l {
        flex: 1;
        image {
          width: 200rpx;
          height: 200rpx;
        }
      }
      .txt_l {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden; /*超出显示省略号需要在父容器加这个*/
      }
      .txt_title {
        font-size: 30rpx;
        color: #333333;
        padding-bottom: 10rpx;
      }
      .txt_content {
        padding: 10rpx 0;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .btn_wrap {
        display: flex;
        justify-content: flex-end;
        margin-top: 10rpx;
      }
      .btn_inner {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10rpx;
        color: $color;
        border: 1px solid $color;
      }
    }
  }
</style>