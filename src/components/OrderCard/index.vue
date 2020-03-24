<template>
  <card shadow="never">
    <view slot="header">商品信息</view>
    <view class="order-cont">
      <view class="order-item" v-for="(item, index) in skuList" :key="index">
        <view class="thumb"><van-image width="100%" height="100%" :src="item.imgUrl" /></view>
        <view class="order-body">
          <view class="tit van-multi-ellipsis--l2">{{ item.productName }}</view>
          <view class="desc">{{ item.name }}</view>
        </view>
        <view class="order-extra">
          <view class="price">￥{{ item.price | format }}</view>
          <view class="origin-price">￥{{ item.price | format }}</view>
          <view class="num">x{{ item.count }}</view>
        </view>
      </view>
    </view>
    <view slot="extra" class="order-price">
      <view class="order-price-item price-red-font">
        <text class="label">商品金额</text>
        <text class="value">￥{{ price | format }}</text>
      </view>
      <view class="order-price-item">
        <text class="label">运费</text>
        <text class="value">+ ￥{{ express | format }}</text>
      </view>
    </view>
  </card>
</template>

<script>
// components
import Card from '@/components/Card/index.vue';

export default {
  props: {
    skuList: {
      type: Array,
      default: () => []
    },
    express: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    price() {
      return this.skuList.reduce((prev, curr) => curr.price + prev, 0);
    }
  },
  components: {
    Card
  }
};
</script>

<style lang="scss">
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
    flex: 0 0 120rpx;
    width: 120rpx;
    min-width: 0;
    height: 120rpx;
    margin-right: 16rpx;
    background-color: #f4f4f4;
  }

  .order-body {
    flex: 1;
    width: 100%;
    min-width: 0;
    margin-right: 16rpx;

    .tit {
      font-size: $font13;
      font-weight: 500;
    }

    .desc {
      font-size: $font12;
      color: $text-l;
    }
  }

  .order-extra {
    text-align: right;

    .price {
      font-weight: 500;
    }

    .origin-price {
      font-size: $font11;
      color: $text-l;
      text-decoration: line-through;
    }

    .num {
      color: #999;
    }
  }
}

.order-price {
  width: 100%;
  color: #333;

  .order-price-item {
    display: flex;
    line-height: 50rpx;

    &.price-red-font {
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
</style>
