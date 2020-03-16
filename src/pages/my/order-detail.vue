<template>
  <view class="order-detail">
    <contact-card :value="delivery" disabled/>
    <split/>
    <card>
      <view class="order-cont">
        <view class="order-item" v-for="item in order_info.skuList" :key="item.productId">
          <view class="thumb">
            <van-image width="100%" height="100%" :src="item.imgUrl"/>
          </view>
          <view class="order-body">
            <view class="tit van-multi-ellipsis--l2">{{item.productName}}</view>
          </view>
          <view class="order-extra">
            <view class="price">￥{{item.price | format}}</view>
            <view class="num">x{{item.count}}</view>
          </view>
        </view>
      </view>
      <view slot="extra" class="orderPrice">
        <view class="orderPrice-item">
          <text class="label">运费</text>
          <text class="value">+ ￥{{order_info.freight_price | format}}</text>
        </view>
        <view class="orderPrice-item">
          <text class="label">商品优惠</text>
          <text class="value">- ￥{{order_info.coupon_reduce_price | format}}</text>
        </view>
        <view class="orderPrice-item result">
          <text class="label">实付款(含运费)</text>
          <text class="value">￥{{order_info.order_total_price | format}}</text>
        </view>
      </view>
    </card>
    <split/>
    <view class="order-info">
      <view class="tit">订单信息</view>
      <view class="info-list">
        <view>
          <view class="item van-clearfix">
            <text class="label">订单编号</text>
            {{ order_info.payOrderId | maskerFilter('9999 9999 9999 9999 999') }}
            <view class="fr" style="line-height: 20px;">
              <van-button size="mini" type="default" @click="clipboard">复制</van-button>
            </view>
          </view>
          <view class="item">
            <text class="label">创建订单时间</text>
            {{ order_info.createdAt | parseTime }}
          </view>
          <view class="item">
            <text class="label">支付成功时间</text>
            {{ order_info.format_pay_time || '--' }}
          </view>
          <view class="item">
            <text class="label">交易完成时间</text>
            {{ order_info.format_transaction_time || '--' }}
          </view>
        </view>
      </view>
    </view>
    <view class="btn-wrapper fixed-bottom tool-bar">
      <van-button type="default" size="small">删除订单</van-button>
      <van-button type="default" size="small">重新购买</van-button>
    </view>
    <van-toast id="van-toast"/>
  </view>
</template>

<script>
  // components
  import ContactCard from '@/components/ContactCard/index.vue'
  import Card from '@/components/Card/index.vue'
  import Split from '@/components/Split/index.vue'
  // wxcomponents
  import Toast from '@/wxcomponents/vant/dist/toast/toast.js'

  // mockData
  import {detail} from './mock.js'

  export default {
    data() {
      return {
        delivery: {},
        order_info: {}
      }
    },
    onLoad() {
      this.fetchDetail()
    },
    methods: {
      fetchDetail() {
        Toast.loading('加载中...')
        this.delivery = detail.delivery
        this.order_info = detail
      },
      clipboard() {
        uni.getClipboardData({
          success(res) {
            console.log(res)
          }
        })
      }
    },
    components: {
      ContactCard,
      Card,
      Split
    }
  }
</script>

<style lang="scss">
  .order-detail {
    .order-cont {
      width: 100%;
    }

    .order-item {
      display: flex;
      width: 100%;

      & + .order-item {
        margin-top: 20rpx;
      }

      .thumb {
        flex: 0 0 100rpx;
        width: 100rpx;
        min-width: 0;
        height: 100rpx;
        margin-right: 16rpx;
      }

      .order-body {
        flex: 1;
        width: 100%;
        min-width: 0;
        margin-right: 16rpx;
      }

      .order-extra {
        text-align: right;

        .num {
          color: #999;
        }
      }
    }

    .orderPrice {
      width: 100%;
      color: #333;

      .orderPrice-item {
        display: flex;

        &.result {
          font-size: $font14;
          line-height: 52rpx;

          .value {
            color: #f44;
            font-weight: 500;
          }
        }

        .label,
        .value {
          display: inline-block;
        }

        .label {
          flex: 0 0 200rpx;
          width: 200rpx;
          min-width: 0;
        }

        .value {
          flex: 1;
          width: 100%;
          min-width: 0;
          text-align: right;
        }
      }
    }

    .order-info {
      background-color: #fff;
      padding: 32rpx;

      .tit {
        border-left: 4rpx solid $primary;
        padding-left: 16rpx;
        margin-bottom: 16px;
        color: $text;
        font-size: $font14;
      }

      .info-list {
        color: $text-l;
        font-size: $font12;
        line-height: 48rpx;

        .item {
          .label {
            width: 144rpx;
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
