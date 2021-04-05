<template>
  <view>
    <!--大图-->
    <view v-if="album.name" class="big_img_wrap">
      <view class="img_item">
        <image mode="aspectFill" :src="album.cover"></image>
      </view>
      <view class="img_intro_txt">
        <view class="intro_inner">
          <view class="intro_txt">{{album.name}}</view>
          <view class="btn_wrap">关注专辑</view>
        </view>
      </view>
    </view>
    <!--作者信息-->
    <view v-if="album.user.avatar" class="auth_info_wrap">
      <view class="auth_img">
        <view class="img_l">
          <image mode="widthFix" :src="album.user.avatar"></image>
        </view>
        <view class="auth_name">{{album.user.name}}</view>
      </view>
      <view class="auth_intro">
        <text>{{album.desc}}</text> <!--防止有换行符-->
      </view>
    </view>
    <!--图片列表-->
    <view v-if="wallpaper&&wallpaper.length" class="all_img_wrap">
      <view v-for="(item, index) in wallpaper" :key="item.id" class="img_item">
        <go-detail :list="wallpaper" :index="index">
          <image mode="widthFix" :src="item.thumb"></image>
        </go-detail>
      </view>
    </view>
  </view>
</template>

<script>
  import {getAlbumDetail} from '../../api/album'
  import goDetail from '@/components/goDetail'
  export default {
    name: "index",
    components: { goDetail },
    data() {
      return {
        params: {
          limit: 30,
          order: 'new',
          skip: 0,
          first: 1
        },
        hasMore: true,
        id: '',
        album: {},
        wallpaper: []
      }
    },
    onLoad(options) {
      this.id = options.id
      this.getAlbumList()
    },
    // 页面触底加载下一页
    onReachBottom() {
      if (this.hasMore) {
        this.params.first = 0
        this.params.skip += this.params.limit
        this.getAlbumList()
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
      }
    },
    methods: {
      getAlbumList() {
        getAlbumDetail(this.params, this.id).then(res => {
          if (Object.keys(this.album).length === 0) {
            this.album = res.album
          }
          if (this.wallpaper.length && res.wallpaper.length === 0) {
            this.hasMore = false
            uni.showToast({
              title: '没有数据了',
              icon: 'none'
            })
            return
          }
          this.wallpaper = [...this.wallpaper, ...res.wallpaper]
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.big_img_wrap {
  position: relative;
  .img_item {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
  .img_intro_txt {
    width: 100%;
    padding: 0 15rpx;
    position: absolute;
    bottom: 15rpx;
    .intro_inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .intro_txt {
      font-size: 40rpx;
      color: #ffffff;
    }
    .btn_wrap {
      background-color: $color;
      color: #ffffff;
      padding: 10rpx;
      border-radius: 10rpx;
    }
  }
}
  .auth_info_wrap {
    padding: 20rpx 15rpx 40rpx;
    .auth_img {
      display: flex;
      .img_l {
        width: 100rpx;
        height: 100rpx;
      }
      .auth_name {
        margin-left: 20rpx;
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
      }
    }
    .auth_intro {
      margin-top: 20rpx;
      font-size: 30rpx;
    }
  }
  .all_img_wrap {
    display: flex;
    flex-wrap: wrap;
    .img_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
</style>