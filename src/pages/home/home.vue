<template>
  <view class="home">
    <view class="search-bar fixed">
      <view class="search-icon tap-active" @click="scan"><text class="iconfont icon-scanning"></text></view>
      <view class="search-field search-field__value"><van-search :label="city" placeholder="搜索" readonly @click.native="onClick('../home/search')"></van-search></view>
      <view class="search-icon tap-active" @click="onClick('../home/comments')"><text class="iconfont icon-comments"></text></view>
    </view>
    <view class="swiper">
      <view class="swiper-box">
        <swiper circular autoplay interval="3000" duration="500" @change="swiperChange">
          <swiper-item v-for="(item, index) in banner" :key="index"><van-image width="100%" height="420rpx" lazy-load :src="item.imgUrl"></van-image></swiper-item>
        </swiper>
        <view class="indicator box-shadow light">
          <view class="dots" v-for="(swiper, index) in banner.length" :class="[current_swiper >= index ? 'on' : '']" :key="index"></view>
        </view>
      </view>
    </view>
    <view class="banner">
      <view class="inner">
        <van-image width="100%" height="170rpx" src="https://mall.s.maizuo.com/80a7da098548191c431dfd09c50f9e4b.jpg?x-oss-process=image/resize,w_563"></van-image>
      </view>
    </view>

    <!-- 可配置一个或多个专题 -->
    <view class="topic" v-for="(elem, index) in topics" :key="index">
      <view class="topic-header van-clearfix">
        <view class="title fl">{{ elem.masterTitle }}</view>
        <view class="more fr" @click="onClick('../product/list')">
          <text>更多</text>
          <van-icon name="arrow" />
        </view>
      </view>
      <view class="topic-banner box-shadow light"><van-image width="100%" height="160rpx" lazy-load :src="elem.banner.imgUrl"></van-image></view>
      <van-row custom-class="products" gutter="16">
        <van-col span="8" v-for="(item, idx) in elem.productList" :key="idx">
          <product
            :thumb="item.sku.imgUrl"
            :title="item.masterName"
            :desc="item.slaveName"
            :price="item.sku.price"
            :origin-price="item.sku.marketPrice"
            :tags="item.labels.common"
            size="xs"
            @click.native="onClick('../product/detail')"
          />
        </van-col>
      </van-row>
    </view>
    <!-- 推荐商品优先配置2n个 -->
    <view class="topic">
      <view class="topic-header mb van-clearfix"><view class="title fl">推荐商品</view></view>
      <van-row custom-class="products" gutter="16">
        <van-col span="12" v-for="(item, index) in guess" :key="index">
          <product
            :thumb="item.sku.imgUrl"
            :title="item.masterName"
            :desc="item.slaveName"
            :price="item.sku.price"
            :origin-price="item.sku.marketPrice"
            :tags="item.labels.common"
            @click.native="onClick('../product/detail')"
          />
        </van-col>
      </van-row>
    </view>
    <split />
  </view>
</template>

<script>
// components
import Product from '@/components/Product/index.vue';
import Split from '@/components/Split/index.vue';

// mockData
import { banner, topics, guess } from './mock.js';

export default {
  data() {
    return {
      location: '',
      city: '定位中',

      current_swiper: 0,
      banner: [],
      topics: [],
      guess: []
    };
  },
  onLoad() {
    // 定位
    this._getLocation();
    this._getRegeo();

    this._getIndex();
  },
  methods: {
    _getIndex() {
      this.banner = banner.data;
      this.topics = topics.data;
      this.guess = guess.data.list;
    },
    // 轮播图指示器
    swiperChange(event) {
      this.current_swiper = event.detail.current;
    },
    // 跳转
    onClick(url) {
      this.$navigateTo(url);
    },
    // 扫码
    scan() {
      const self = this;
      uni.scanCode({
        success(res) {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
        }
      });
    },
    // 定位
    _getLocation() {
      const self = this;
      uni.authorize({
        scope: 'scope.userLocation',
        success() {
          uni.getLocation({
            type: 'gcj02',
            geocode: true,
            success(res) {
              console.log(res);
              self.location = `${res.longitude},${res.latitude}`;
            },
            fail() {
              self.city = '定位失败';
            }
          });
        }
      });
    },
    _getRegeo() {
      const self = this;
      this.$amap.getRegeo({
        location: self.location,
        success(res) {
          if (res && res.length > 0) {
            const addressComponent = res[0].regeocodeData.addressComponent;
            self.city = addressComponent.city.replace(/市/g, '');
          } else {
            self.city = '定位失败';
          }
        },
        fail(info) {
          self.city = '定位失败';
          Toast(JSON.stringify(info));
        }
      });
    }
  },
  components: {
    Product,
    Split
  }
};
</script>

<style lang="scss">
.home {
  padding-top: 54px;
}

.banner {
  background-color: #f7f7f7;
  padding: 16rpx 0;
  width: 100%;
  overflow: hidden;

  .inner {
    height: 170rpx;
  }
}

.topic {
  padding: 32rpx;
  background-color: #fff;

  & + .topic {
    margin-top: 20rpx;
  }

  .topic-header {
    &.mb {
      margin-bottom: 32rpx;
    }
    .title {
      font-weight: 500;
    }

    .more {
      font-size: $font12;
      color: $text-l;

      text {
        vertical-align: 1rpx;
      }
    }
  }

  .topic-banner {
    margin: 32rpx 0;
    height: 160rpx;
    background-color: #e0e0e0;
  }
}

.swiper {
  width: 100%;
  display: flex;
  justify-content: center;

  .swiper-box {
    width: 100%;
    overflow: hidden;
    //兼容ios，微信小程序
    position: relative;
    z-index: 1;

    swiper {
      width: 100%;
      height: 420rpx;

      swiper-item {
        color: #fff;
        text-align: center;
        line-height: 420rpx;

        image {
          width: 100%;
          height: 420rpx;
        }
      }
    }
    .indicator {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      background-color: rgba(255, 255, 255, 0.4);
      width: 150rpx;
      height: 5rpx;
      border-radius: 3rpx;
      overflow: hidden;
      display: flex;

      .dots {
        width: 0rpx;
        background-color: rgba(255, 255, 255, 1);
        transition: all 0.3s ease-out;

        &.on {
          width: (100% / 8);
        }
      }
    }
  }
}
</style>
