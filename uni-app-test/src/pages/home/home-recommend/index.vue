<template>
  <scroll-view @scrolltolower="handleToLower" scroll-y class="recommend_scroll">
    <view v-if="recommendList.length" class="recommend_wrap">
      <!--图片-->
      <view class="recommend_img_wrap">
        <navigator
          :url="`/pages/album/index?id=${item.target}`"
          v-for="item in recommendList"
          :key="item.id"
          class="recommend_img_item">
          <image mode="widthFix" :src="item.thumb"></image>
        </navigator>
      </view>
      <!--时间-->
      <view class="time_wrap">
        <view class="time_title">
          <view class="time_l">
            <view class="time_item_l">
              <text class="time_txt_l">{{timeList.DD}}</text>
              <text class="time_txt_r">/ {{timeList.MM}}月</text>
            </view>
            <view class="time_item_r">
              {{timeList.title}}
            </view>
          </view>
          <view class="time_r">
            更多>
          </view>
        </view>
        <view class="time_content">
          <view v-for="(item, index) in timeList.items" :key="item.id" class="content_img_wrap">
            <go-detail :list="timeList.items" :index="index">
              <image
                mode="aspectFill"
                :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
            </go-detail>
          </view>
        </view>
      </view>
    </view>
    <!--热门-->
    <view v-if="vertical.length" class="hot_wrap">
      <view class="hot_title">
        <text>热门</text>
      </view>
      <view class="hot_img_wrap">
        <view v-for="(item, index) in vertical" :key="item.id" class="img_item_list">
          <go-detail :list="vertical" :index="index">
            <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  import {getRecommend} from '../../../api/home'
  import goDetail from '@/components/goDetail'
  import dayjs from 'dayjs'
  export default {
    components: { goDetail },
    data() {
      return {
        recommendList: [],
        timeList: {
          MM: '',
          DD: ''
        },
        vertical: [],
        params: {
          limit: 30,
          order: 'hot',
          skip: 0
        },
        hasMore: true
      }
    },
    mounted() {
      // 修改页面标题
      uni.setNavigationBarTitle({title: '推荐'})
     this.getList()
    },
    methods: {
      getList() {
        getRecommend(this.params).then(res => {
          if (res.vertical.length === 0) {
            this.hasMore = false
            return
          }
          if (this.recommendList.length === 0){
            this.recommendList = res.homepage[1].items
            this.timeList = res.homepage[2]
            this.timeList.MM = dayjs(this.timeList.stime).format('MM')
            this.timeList.DD = dayjs(this.timeList.stime).format('DD')
          }
          this.vertical = [...this.vertical, ...res.vertical]
        })
      },
      // 触底事件
      handleToLower() {
        if (this.hasMore) {
          this.params.skip += this.params.limit
          this.getList()
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
  .recommend_scroll {
    height: calc(100vh - 36px);
  }
.recommend_img_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_img_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
  .time_wrap {
    .time_title {
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .time_l {
        display: flex;
        font-weight: bold;
      }
      .time_item_l {
        color: $color;
        font-size: 30rpx;
        .time_txt_l {
          font-size: 36rpx;
        }
      }
      .time_item_r {
        margin-left: 30rpx;
        font-size: 36rpx;
      }
      .time_r {
        color: $color;
      }
    }
    .time_content {
      display: flex;
      flex-wrap: wrap;
      .content_img_wrap {
        width: 33.33%;
        border: 3rpx solid #fff;
      }
    }
  }

  .hot_wrap {
    .hot_title {
      padding: 20rpx;
      text {
        border-left: 10rpx solid $color;
        font-size: 34rpx;
        font-weight: bold;
        padding-left: 15rpx;
      }
    }
    .hot_img_wrap {
      display: flex;
      flex-wrap: wrap;
      .img_item_list {
        width: 33.33%;
        border: 3rpx solid #fff;
      }
    }
  }
</style>