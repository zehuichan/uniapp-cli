<template>
  <van-checkbox-group :value="checked" @change="onCheckboxGroupChange">
    <view class="product-card has-checkbox" v-for="(item, index) in items" :key="index">
      <van-checkbox class="checker" :name="item.productId" checked-color="#c03131" />
      <van-card
        custom-class="body"
        price-class="price"
        :title="item.productName"
        :desc="item.options.join(' ')"
        :price="$options.filters.format(item.price)"
        :origin-price="$options.filters.format(item.marketPrice) || ''"
      >
        <view class="thumb" slot="thumb" @click="$emit('click-thumb', item, index)"><van-image width="100%" height="100%" :src="item.imgUrl" /></view>
        <view class="stepper" slot="num">
          <van-stepper :value="item.count" :max="item.inventory" async-change integer @change="onChange(item.productId, $event)" @overlimit="onOverlimit(item.productId, $event)" />
        </view>
      </van-card>
    </view>
  </van-checkbox-group>
</template>

<script>
// vuex
import { mapMutations } from 'vuex';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';
import Dialog from '@/wxcomponents/vant/dist/dialog/dialog.js';

export default {
  name: 'ProductCard',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checked: []
    };
  },
  watch: {
    value(val) {
      this.checked = val;
    }
  },
  methods: {
    onCheckboxGroupChange(event) {
      this.checked = event.detail;
      this.$emit('input', event.detail);
      this.$emit('change', event.detail);
    },
    onChange(productId, event) {
      this['cart/changeItems']({ productId: productId, count: event.detail });
    },
    onOverlimit(productId, event) {
      const self = this;
      if (event.detail === 'plus') {
        Toast('亲，该宝贝不能购买更多哦~');
      }
      if (event.detail === 'minus') {
        Dialog.confirm({
          message: '确定要删除这个商品吗？'
        })
          .then(() => {
            self['cart/deleteItems'](productId);
          })
          .catch(() => {});
      }
    },
    ...mapMutations(['cart/updateItems', 'cart/changeItems', 'cart/deleteItems'])
  }
};
</script>

<style lang="scss">
.product-card {
  position: relative;
  width: 100%;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 4rpx;

  &.has-checkbox {
    padding-left: 46px;

    .checker {
      position: absolute;
      left: 13px;
      top: 50%;
      z-index: 1;
      margin-top: -8px;
    }
  }

  .body {
    position: relative;
    background-color: #fff;
    width: 100%;
    padding-left: 0;
  }

  .thumb {
    background-color: #f8f8f8;
    border-radius: 4rpx;
    width: 88px;
    height: 88px;
  }

  .price {
    color: #c03131;
    font-weight: 500;
  }

  .stepper {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
}
</style>
