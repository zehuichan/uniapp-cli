<template>
  <view class="home">
    <view class="search-bar fixed">
      <view class="search-field search-field__value">
        <van-search :label="city" placeholder="搜索" readonly @click.native="onClick('../home/search')"></van-search>
      </view>
      <view class="search-icon tap-active" @click="scan">
        <text class="iconfont icon-scanning"></text>
      </view>
    </view>
    <view class="swiper">
      <view class="swiper-box">
        <swiper circular autoplay interval="3000" duration="500" @change="swiperChange">
          <swiper-item v-for="(item, index) in 5" :key="index">
            {{ item + 1 }}
            <!-- <image :src="item.url" mode="scaleToFill" v-if="item.type == 'image'"></image> -->
          </swiper-item>
        </swiper>
        <view class="indicator">
          <view class="dots" v-for="(swiper, index) in 5" :class="[current_swiper >= index ? 'on' : '']"
                :key="index"></view>
        </view>
      </view>
    </view>
    <view class="banner">活动banner</view>
    <!-- 可配置一个或多个专题 -->
    <view class="topic" v-for="topic in 2" :key="topic">
      <view class="topic-header van-clearfix">
        <view class="title fl">专题{{ topic + 1 }}</view>
        <view class="more fr" @click="onClick('../product/list')">
          <text>更多</text>
          <van-icon name="arrow"/>
        </view>
      </view>
      <view class="topic-banner box-shadow light">推荐活动banner</view>
      <van-row custom-class="products" gutter="16">
        <van-col span="8" v-for="item in 6" :key="item">
          <product size="xs" @click.native="onClick('../product/detail')"/>
        </van-col>
      </van-row>
    </view>
    <!-- 推荐商品优先配置2n个 -->
    <view class="topic">
      <view class="topic-header mb van-clearfix">
        <view class="title fl">推荐商品</view>
      </view>
      <van-row custom-class="products" gutter="16">
        <van-col span="12" v-for="item in 6" :key="item">
          <product @click.native="onClick('../product/detail')"/>
        </van-col>
      </van-row>
    </view>
    <split/>
  </view>
</template>

<script>
  // components
  import Product from '@/components/Product/index.vue'
  import Split from '@/components/Split/index.vue'

  export default {
    data() {
      return {
        swiper_list: [
          {
            id: 0,
            type: 'image',
            url: '../../static/img/banner/01banner.jpg'
          },
          {
            id: 1,
            type: 'image',
            url: '../../static/img/banner/02banner.jpg'
          },
          {
            id: 2,
            type: 'image',
            url: '../../static/img/banner/03banner.jpg'
          },
          {
            id: 3,
            type: 'image',
            url: '../../static/img/banner/04banner.jpg'
          }
        ],
        current_swiper: 0,
        location: '',
        city: '定位中'
      }
    },
    onLoad() {
      // 定位
      this._getLocation()
      this._getRegeo()
    },
    methods: {
      // 轮播图指示器
      swiperChange(event) {
        this.current_swiper = event.detail.current
      },
      onClick(url) {
        this.$navigateTo(url)
      },
      // 扫码
      scan() {
        const self = this
        uni.scanCode({
          success(res) {
            console.log('条码类型：' + res.scanType)
            console.log('条码内容：' + res.result)
          }
        })
      },
      // 定位
      _getLocation() {
        const self = this
        uni.getLocation({
          type: 'gcj02',
          geocode: true,
          success(res) {
            console.log(res)
            self.location = `${res.longitude},${res.latitude}`
          },
          fail() {
            self.textData = {
              name: '抱歉，未找到结果',
              desc: '请稍后再试'
            }
          }
        })
      },
      _getRegeo() {
        const self = this
        this.$amap.getRegeo({
          location: self.location,
          success(res) {
            if (res && res.length > 0) {
              const addressComponent = res[0].regeocodeData.addressComponent
              self.city = addressComponent.city.replace(/市/g, '')
            } else {
              self.city = '定位失败'
            }
          },
          fail(info) {
            self.city = '定位失败'
            Toast(JSON.stringify(info))
          }
        })
      }
    },
    components: {
      Product,
      Split
    }
  }
</script>

<style lang="scss">
  .home {
    padding-top: 54px;
  }

  .banner {
    height: 140rpx;
    line-height: 140rpx;
    margin: 30rpx 40rpx;
    background-color: #e0e0e0;
    text-align: center;
    font-size: 24rpx;
    color: #a9a9a9;
    border-radius: 70rpx;
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
      height: 140rpx;
      line-height: 140rpx;
      background-color: #e0e0e0;
      text-align: center;
      font-size: 24rpx;
      color: #a9a9a9;
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
        height: 360rpx;

        swiper-item {
          color: #fff;
          text-align: center;
          line-height: 360rpx;

          &:nth-child(odd) {
            background-color: #66c6f2;
          }

          &:nth-child(even) {
            background-color: #39a9ed;
          }

          image {
            width: 100%;
            height: 360rpx;
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
            width: (100% / 5);
          }
        }
      }
    }
  }
</style>
