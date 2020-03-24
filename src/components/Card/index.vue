<template>
  <view class="card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <view class="card__header van-hairline--bottom" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </view>
    <view class="card__body" :style="bodyStyle"><slot></slot></view>
    <view class="card__extra van-hairline--top" :style="extraStyle" v-if="$slots.extra || extra">
      <slot name="extra">{{ extra }}</slot>
    </view>
    <view class="card__footer van-hairline--top" v-if="$slots.footer || footer">
      <slot name="footer">{{ footer }}</slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Card',
  props: {
    header: {},
    bodyStyle: {},
    extraStyle: {},
    extra: {},
    footer: {},
    shadow: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.card {
  border-radius: 2px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  font-size: $font12;

  &.is-always-shadow {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &.is-never-shadow {
    border-radius: 0;
    // border: 0;
  }

  .card__header {
    padding: 22rpx 32rpx;
    box-sizing: border-box;
  }

  .card__body {
    padding: 32rpx;
  }

  .card__extra,
  .card__footer {
    position: relative;
    font-size: 12px;
    padding: 22rpx 32rpx;
  }
}
</style>
