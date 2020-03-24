<template>
  <view class="order-detail">
    <contact-card :value="delivery" disabled />
    <split />
    <order-card :sku-list="sku_list" :express="1800" />
    <split />
    <view class="order-info">
      <view class="tit">订单信息</view>
      <view class="info-list">
        <view>
          <view class="item van-clearfix">
            <text class="label">订单编号</text>
            {{ order_info.payOrderId | maskerFilter('9999 9999 9999 9999 999') }}
            <view class="fr" style="line-height: 20px;"><van-button size="mini" type="default" @click="clipboard">复制</van-button></view>
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
      <view class="total fl">实付款(含运费)：￥101.00</view>
      <view class="fr">
        <van-button type="default" size="small">删除订单</van-button>
        <van-button type="default" size="small">重新购买</van-button>
      </view>
    </view>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
// components
import ContactCard from '@/components/ContactCard/index.vue';
import OrderCard from '@/components/OrderCard/index.vue';
import Split from '@/components/Split/index.vue';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';

// mockData
import { detail } from './mock.js';

export default {
  data() {
    return {
      delivery: {},
      sku_list: [],
      order_info: {}
    };
  },
  onLoad() {
    this.fetchDetail();
  },
  methods: {
    fetchDetail() {
      Toast.loading('加载中...');
      this.delivery = detail.delivery;
      this.sku_list = detail.skuList;
      this.order_info = detail;
    },
    clipboard() {
      uni.setClipboardData({
        data: this.order_info.payOrderId
      });
    }
  },
  components: {
    ContactCard,
    OrderCard,
    Split
  }
};
</script>

<style lang="scss">
.order-detail {
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

  .total {
    font-size: 12px;
    line-height: 30px;
    font-weight: 500;
  }
}
</style>
