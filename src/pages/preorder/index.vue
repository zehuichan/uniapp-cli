<template>
  <view class="preorder">
    <contact-card :value="chosen_address || default_list" />
    <split />
    <order-card :sku-list="sku_list" :express="1800" />
    <split />
    <van-cell title="优惠券" value="暂无可用" is-link />
    <split />
    <view class="tips">
      <view>1、若卖家未在36小时内发货，您将获得48元现金及170元优惠券补偿。</view>
      <view>2、每件交易商品均由平台针对实物进行鉴别，鉴于商品价格波动性，同时每个款式每个尺码的商品出售时仅有一件等情况，故不支持退换差价。</view>
      <view>*提交订单即表示同意</view>
    </view>
    <van-submit-bar label="实付款：" :price="3050" button-text="提交订单" @submit="onSubmit" />
    <van-toast id="van-toast" />
  </view>
</template>

<script>
// vuex
import { mapGetters, mapMutations } from 'vuex';
// components
import ContactCard from '@/components/ContactCard/index.vue';
import OrderCard from '@/components/OrderCard/index.vue';
import Split from '@/components/Split/index.vue';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';

// mockData
import { address, skuList } from './mock.js';

export default {
  data() {
    return {
      delivery: {},
      sku_list: [],
      coupons: []
    };
  },
  computed: {
    ...mapGetters(['chosen_address', 'default_list', 'coupon'])
  },
  onLoad() {
    Toast.loading('加载中...');
    // 获取地址信息
    this.fetchAddress();
    // 获取商品信息
    this.fetchOrderInfo();
  },
  methods: {
    fetchAddress() {
      this['address/setAddressList'](address);
    },
    fetchOrderInfo() {
      this.sku_list = skuList;
    },
    onSubmit() {},
    ...mapMutations(['address/setAddressList'])
  },
  components: {
    ContactCard,
    OrderCard,
    Split
  }
};
</script>

<style lang="scss">
.preorder {
  padding-bottom: 50px;

  .tips {
    padding: 16rpx 32rpx;
    background-color: #fff;
    line-height: 48rpx;
    color: $text-l;
    font-size: $font12;
    font-weight: 500;
  }

  .van-submit-bar__text {
    text-align: left !important;
  }
}
</style>
