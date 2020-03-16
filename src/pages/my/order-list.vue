<template>
  <view class="order-list">
    <van-tabs :active="active" tab-active-class="tab-active" color="#c03131" @change="onChange">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
    </van-tabs>
    <list :loading="loading" :finished="finished" top="44px">
      <view class="page-wrapper padded">
        <card v-for="(item, index) in list" :key="index">
          <view slot="header" class="van-clearfix">
            <view class="fl">订单编号：{{ item.payOrderId }}</view>
            <view class="fr"><van-tag color="#ff5000">已取消</van-tag></view>
          </view>
          <view class="order-cont" @click="onClick('../my/order-detail')">
            <view class="order-item" v-for="subItem in item.skuList" :key="subItem.productId">
              <view class="thumb"><van-image width="100%" height="100%" :src="subItem.imgUrl" /></view>
              <view class="order-body">
                <view class="tit ellipsis-2">{{ subItem.productName }}</view>
                <view class="desc">{{ subItem.name }}</view>
              </view>
              <view class="order-extra">
                <view class="price">￥ {{ subItem.price | format }}</view>
                <view class="num">x{{ subItem.count }}</view>
              </view>
            </view>
          </view>
          <view slot="extra" class="order-price text-right">
            <text>共 {{ item.skuList.length }} 件商品 合计：</text>
            <text class="price">
              <text class="unit">￥</text>
              {{ item.totalPrice | format }}
            </text>
            <text class="freight">(含运费￥{{ item.expressAmount | format }})</text>
          </view>
          <div slot="footer" class="order-footer text-right">
            <van-button size="mini" plain type="default">删除订单</van-button>
            <van-button size="mini" plain type="default">重新购买</van-button>
          </div>
        </card>
      </view>
    </list>
  </view>
</template>

<script>
// components
import List from '@/components/List/index.vue';
import Card from '@/components/Card/index.vue';
// mockData
import { list } from './mock.js';

export default {
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: []
    };
  },
  onLoad({ active }) {
    this.active = ~~active || 0;
    this.fetchList();
  },
  methods: {
    onChange(event) {},
    fetchList() {
      this.loading = true;
      this.list = list;
      this.loading = false;
      this.finished = true;
    },
    onClick(url, json) {
      this.$navigateTo(url, json);
    }
  },
  components: {
    List,
    Card
  }
};
</script>

<style lang="scss">
.order-list {
  .tab-active {
    color: #c03131;
  }
}

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
    height: 120rpx;
    margin-right: 16rpx;
    background-color: #f4f4f4;
    border-radius: 4rpx;
  }

  .order-body {
    flex: 1;
    width: 100%;
    min-width: 0;
    margin-right: 16rpx;

    .tit {
      font-size: $font13;
    }

    .desc {
      color: $text-l;
    }
  }

  .order-extra {
    text-align: right;

    .num {
      color: $text-l;
    }
  }
}

.order-price {
  width: 100%;
  color: $text;

  .price {
    font-size: $font14;
    color: $primary;
    margin-right: 10rpx;

    .unit {
      font-size: $font11;
    }
  }
}

.order-footer {
  van-button + van-button {
    margin-left: 20rpx;
  }
}
</style>
