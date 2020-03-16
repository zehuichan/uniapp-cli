<template>
  <view class="product-list">
    <view class="search-bar fixed">
      <view class="search-field search-field__alone">
        <van-search :value="kw" placeholder="搜索"></van-search>
      </view>
    </view>
    <view class="page-wrapper padded">
      <van-row gutter="16">
        <van-col span="12" v-for="item in list" :key="item.productId">
          <product
            :thumb="item.sku.imgUrl"
            :title="item.masterName"
            :desc="item.slaveName"
            :price="item.sku.price"
          />
        </van-col>
      </van-row>
      <load-more :loading="loading" :finished="finished"/>
    </view>
  </view>
</template>

<script>
  // components
  import Product from '@/components/Product/index.vue'
  import LoadMore from '@/components/LoadMore/index.vue'
  // mockData
  import {list} from './mock.js'

  export default {
    data() {
      return {
        kw: '专题一',
        list:[],
        loading: true,
        finished: false
      }
    },
    onLoad() {

      this._getProducts()
    },
    methods: {
      _getProducts() {
        this.list = list.data.list
        this.loading = false
        this.finished = true
      },
    },
    components: {
      Product,
      LoadMore
    }
  }
</script>

<style lang="scss">
  .product-list {
    background-color: #fff;
    padding-top: 54px;
  }
</style>
