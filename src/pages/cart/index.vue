<template>
  <view class="cart">
    <view class="page-wrapper padded"><product-card :value="checked" :items="items" @change="onCheckboxGroupChange" @click-thumb="onClickThumb" /></view>
    <van-submit-bar :price="total" :button-text="`结算(${num})`" @submit="onSubmit">
      <van-checkbox :value="checkAll" checked-color="#c03131" @change="onCheckboxChange">全选</van-checkbox>
    </van-submit-bar>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex';
// components
import ProductCard from '@/components/ProductCard/index.vue';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';
import Dialog from '@/wxcomponents/vant/dist/dialog/dialog.js';

export default {
  data() {
    return {
      checked: [],
      checkAll: false
    };
  },
  computed: {
    total() {
      return this.products.reduce((prev, curr) => curr.price * curr.count + prev, 0);
    },
    products() {
      return this.items.filter(item => this.checked.map(Number).includes(item.productId));
    },
    num() {
      return this.products.reduce((prev, curr) => curr.count + prev, 0);
    },
    ...mapGetters(['items'])
  },
  methods: {
    onClickThumb() {
      this.$navigateTo('../product/detail');
    },
    onSubmit() {
      if (this.checked.length === 0) {
        Toast('您还没有选择商品哦');
        return false;
      }
      const goods_data = {};
      this.products.forEach(v => {
        goods_data[v.productId] = v.count;
      });
      Toast({
        message: JSON.stringify(goods_data),
        onClose: () => {
          this.$navigateTo('../preorder/index');
        }
      });
    },
    onCheckboxGroupChange(val) {
      this.checked = val;
      this.checkAll = this.products.length === this.items.length;
    },
    onCheckboxChange(event) {
      if (event.detail) {
        this.checked = this.items.map(item => item.productId + '');
      } else {
        this.checked = [];
      }
      this.checkAll = event.detail;
    }
  },
  components: {
    ProductCard
  }
};
</script>

<style></style>
