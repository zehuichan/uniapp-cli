<template>
  <view class="contact-card" :class="!disabled ? 'tap-active' : ''">
    <view class="contact-cell" v-if="Object.keys(value).length > 0">
      <view class="iconfont icon-brand van-cell__left-icon"></view>
      <view class="van-cell__value van-cell__value--alone">
        <view class="van-clearfix">
          <view class="contact-cell__name fl">{{ value.name }}</view>
          <view class="contact-cell__phone fr">{{ value.phone | formatPhone }}</view>
        </view>
        <view class="contact-cell__address van-ellipsis">{{ value.address }}</view>
      </view>
      <view class="van-cell__right-icon"><van-icon name="arrow" v-if="!disabled" /></view>
    </view>
    <view class="contact-cell contact-cell--add" v-else>
      <view class="van-cell__left-icon"><van-icon name="add-square" size="40" /></view>
      <view class="van-cell__value van-cell__value--alone">选择或添加联系人</view>
      <view class="van-cell__right-icon"><van-icon name="arrow" /></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    value: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.contact-card {
}

.contact-cell {
  position: relative;
  display: flex;
  width: 100%;
  padding: 32rpx;
  font-size: 28rpx;
  background-color: #fff;

  &:before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(-45deg, #db6d66 0, #db6d66 20%, transparent 0, transparent 25%, #6486a4 0, #6486a4 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: '';
  }
}

.van-cell__left-icon,
.van-cell__right-icon {
  min-width: 1em;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
}

.van-cell__left-icon {
  margin-right: 30rpx;
  font-size: 24px;
  color: #1989fa;
}

.van-cell__right-icon {
  margin-left: 30rpx;
}

.contact-cell__name,
.contact-cell__phone {
  font-weight: 500;
}

.contact-cell__phone {
  font-size: 24rpx;
  color: #666;
}

.contact-cell__address {
  color: #7f7f8e;
  line-height: 40rpx;
  margin-top: 16rpx;
  font-size: 24rpx;
  font-weight: 500;
}

.van-cell__value {
  position: relative;
  overflow: hidden;
  color: #969799;
  vertical-align: middle;
  word-wrap: break-word;
}

.van-cell__value--alone {
  color: #323233;
  text-align: left;
}

.van-cell__title,
.van-cell__value {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.contact-cell--add {
  .van-cell__value--alone {
    line-height: 80rpx;
  }

  .van-cell__right-icon {
    margin-top: 20rpx;
  }
}
</style>
