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
        <view v-if="current<4">
          <videoRecommend/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import videoRecommend from "./video-recommend"

  export default {
    name: "index",
    components: {
      videoRecommend
    },
    data() {
      return {
        items: ['推荐', '娱乐', '最新', '热门', '分类'],
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