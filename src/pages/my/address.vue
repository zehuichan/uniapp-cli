<template>
  <view class="address">
    <view class="address-item" v-for="(item, index) in address_list" :key="index">
      <view>
        <view class="address-cell">
          <view class="address-cell__title">{{ item.name }}</view>
          <view class="address-cell__value">{{ item.phone | formatPhone }}</view>
        </view>
        <view class="address-item__address van-multi-ellipsis--l2">{{ formatAddress(item) }}</view>
      </view>
      <view class="address-edit van-hairline--top">
        <view class="address-edit__radio" v-if="item.isDefault === 1"><van-tag type="primary">默认地址</van-tag></view>
        <view class="address-edit__handle">
          <text class="edit">编辑</text>
          <text class="delete">删除</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['address_list'])
  },
  methods: {
    formatAddress(val) {
      return `${val.provinceName} ${val.cityName} ${val.districtName} ${val.address}`
    }
  }
};
</script>

<style lang="scss">
.address-item {
  width: 100%;
  background-color: #fff;
  color: #14151a;
  font-weight: 500;
  font-size: $font14;

  & + .address-item {
    margin-top: 16rpx;
  }

  .address-cell {
    display: flex;
    padding: 32rpx;

    &__title,
    &__value {
      flex: 1;
    }

    &__title {
      text-align: left;
      font-size: $font16;
      color: #333;
      font-weight: 500;
    }

    &__value {
      text-align: right;
      font-size: $font12;
      color: #666;
    }
  }

  .address-edit {
    display: flex;
    padding: 24rpx 32rpx;
    font-size: 24rpx;

    &__radio,
    &__handle {
      flex: 1;
    }

    &__handle {
      text-align: right;
    }

    .edit,
    .delete {
      padding: 16rpx;
      font-weight: 500;
    }

    .edit {
      color: #01c2c3;
    }

    .delete {
      color: #ff4657;
    }
  }

  &__address {
    padding: 0 32rpx 32rpx;
  }
}
</style>
