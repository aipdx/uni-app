<template>
  <view>
    <view class="home_tab">
      <view class="home_tab_title">
        <view class="home_tab_item">
          <uni-segmented-control
            :current="current"
            :values="items"
            @clickItem="onClickItem"
            styleType="text"
            activeColor="#d4237a">
          </uni-segmented-control>
        </view>
        <view class="home_tab_search">
          <text class="iconfont icon-search"></text>
        </view>
      </view>
      <view class="home_tab_content">
        <view v-if="current===0">
          <homeRecommend/>
        </view>
        <view v-if="current===1">
          <homeCategory/>
        </view>
        <view v-if="current===2">
          <homeNew/>
        </view>
        <view v-if="current===3">
          <homeAlbum/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import homeAlbum from "./home-album"
  import homeCategory from "./home-category"
  import homeNew from "./home-new"
  import homeRecommend from "./home-recommend"

  export default {
    name: "index",
    components: {
      homeAlbum,
      homeCategory,
      homeNew,
      homeRecommend
    },
    data() {
      return {
        items: ['推荐', '分类', '最新', '专辑'],
        current: 0
      }
    },
    methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home_tab {
    .home_tab_title {
      display: flex;
      justify-content: center;
      position: relative;
    }

    .home_tab_item {
      width: 60%;
    }

    .home_tab_search {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
</style>