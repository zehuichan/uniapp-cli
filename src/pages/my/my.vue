<template>
  <view class="my">
    <view class="my-header" style="background-image: url(https://file.sdyxmall.com/h5/v1/public/app/img/bg.71ef26b.png);">
      <view class="avatar" @click="onClick('../my/account')"><van-image width="100%" height="100%" src="https://mall.s.maizuo.com/e915e2c990c30f8efa9e30bc75da41ee.jpg" /></view>
      <view class="nick-name">158****6380</view>
    </view>
    <view class="my-body page-wrapper padded">
      <card>
        <view slot="header" class="van-clearfix">
          <view class="title fl">我的订单</view>
          <view class="extra fr" @click="onClick('../my/order-list', { active: 0 })">
            查看更多订单
            <van-icon name="arrow" />
          </view>
        </view>
        <!-- 订单状态需在api返回 -->
        <view class="my-order-tab">
          <van-row>
            <van-col span="6">
              <view class="my-order-tab--item tap-active" @click="onClick('../my/order-list', { active: 1 })">
                <view class="icon"><text class="iconfont icon-wallet"></text></view>
                <view class="txt">待付款</view>
              </view>
            </van-col>
            <van-col span="6">
              <view class="my-order-tab--item tap-active" @click="onClick('../my/order-list', { active: 2 })">
                <view class="icon"><text class="iconfont icon-packaging"></text></view>
                <view class="txt">待发货</view>
              </view>
            </van-col>
            <van-col span="6">
              <view class="my-order-tab--item tap-active" @click="onClick('../my/order-list', { active: 3 })">
                <view class="icon"><text class="iconfont icon-landtransportation"></text></view>
                <view class="txt">待收货</view>
              </view>
            </van-col>
            <van-col span="6">
              <view class="my-order-tab--item tap-active">
                <view class="icon"><text class="iconfont icon-tuishuirongzi"></text></view>
                <view class="txt">退款/售后</view>
              </view>
            </van-col>
          </van-row>
        </view>
      </card>
    </view>
    <view class="page-wrapper">
      <van-cell-group :border="false">
        <van-cell title="我的积分" value="可用积分 0.00" is-link @click="onClick('../my/integral')">
          <view slot="icon" class="my-icon text-auxiliary-warning iconfont icon-credit-level"></view>
        </van-cell>
        <van-cell title="我的卡券" value="可用卡券 0 张" is-link @click="onClick('../my/coupon')">
          <view slot="icon" class="my-icon text-auxiliary-danger iconfont icon-coupons"></view>
        </van-cell>
        <van-cell title="收货地址管理" is-link @click="onClick('../my/address')"><view slot="icon" class="my-icon text-auxiliary-primary iconfont icon-map"></view></van-cell>
        <van-cell title="客服" is-link><view slot="icon" class="my-icon text-auxiliary-success iconfont icon-listing-content"></view></van-cell>
      </van-cell-group>
      <split />
      <van-cell-group :border="false">
        <van-cell title="设置" is-link><view slot="icon" class="my-icon text-auxiliary-default iconfont icon-set"></view></van-cell>
      </van-cell-group>
    </view>
  </view>
</template>

<script>
// components
import Card from '@/components/Card/index.vue';
import Split from '@/components/Split/index.vue';

export default {
  data() {
    return {};
  },
  methods: {
    onClick(url, json) {
      this.$navigateTo(url, json);
    }
  },
  components: {
    Card,
    Split
  }
};
</script>

<style lang="scss">
.my {
  .my-header {
    background-size: cover;
    padding: 48rpx 32rpx;
    display: flex;
    align-items: center;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      margin-right: 32rpx;
    }

    .nick-name {
    }
  }

  .my-body {
    .title {
    }

    .extra {
      .van-icon {
        font-size: 10px;
        font-weight: 700;
      }
    }

    .my-order-tab {
      text-align: center;

      .my-order-tab--item {
        padding: 20 rpx 0;
      }

      .icon {
        .iconfont {
          font-size: 56rpx;
          line-height: 1;
          color: $text-l;
        }
      }
    }
  }

  .my-icon {
    font-size: $font20;
    margin-right: 5px;
  }
}
</style>
