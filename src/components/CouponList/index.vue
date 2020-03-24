<template>
  <view class="coupon-list">
    <van-checkbox-group :value="checks" @change="onChange">
      <view class="coupon-item" :class="classes" v-for="(item, index) in source" :key="index">
        <van-checkbox class="coupon-item__checker" v-if="showCheckbox" :name="item.id" />
        <view class="coupon-item__content">
          <view class="coupon-item__head">
            <view class="h2">
              <text>￥</text>
              {{ item.reduce_money | format(0) }}
            </view>
            <view class="p">满{{ item.full_money | format }}可用</view>
          </view>
          <view class="coupon-item__body">
            <view class="h2">{{ item.name }}</view>
            <view class="p">有效期：{{ item.record_time }} - {{ item.expire_time }}</view>
          </view>
        </view>
      </view>
    </van-checkbox-group>
  </view>
</template>

<script>
export default {
  name: 'coupon-list',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    source: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checks: []
    };
  },
  computed: {
    classes() {
      return this.showCheckbox ? 'has-checkbox' : '';
    }
  },
  watch: {
    value(val) {
      this.checks = val;
    },
    checks(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    }
  },
  methods: {
    onChange(event) {
      this.checks = event.detail;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.coupon-list {
}
.coupon-item {
  position: relative;
  width: 100%;
  border-radius: 4px;

  &.has-checkbox {
    padding-left: 30px;

    .coupon-item__checker {
      position: absolute;
      left: 0;
      top: 50%;
      z-index: 1;
      margin-top: -10px;
    }
  }

  .h2,
  .p {
    font-weight: 500;
  }

  .p {
    margin-bottom: 4px;
    font-size: 12px;
  }

  .coupon-item__content {
    position: relative;
    background-color: #fff;
    display: flex;
    width: 100%;
  }

  .coupon-item__head {
    position: relative;
    padding: 20px 16px;
    min-width: 120px;
    text-align: center;

    .h2 {
      color: #01c2c3;
      font-size: 24px;

      span {
        font-size: 50%;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: 16px;
      right: 5px;
      border-right: 1px dashed #ddd;
      height: 70%;
    }
  }

  .coupon-item__body {
    position: relative;
    flex: 1;
    padding: 20px 16px;

    .h2 {
      font-size: 14px;
      margin-top: 8px;
      margin-bottom: 4px;
    }

    .p {
      color: #999;
    }

    &:after,
    &:before {
      content: ' ';
      position: absolute;
      left: -16px;
      z-index: 1;
      background-color: #f5f5f9;
      width: 20px;
      height: 10px;
    }

    &:before {
      top: 0;
      border-radius: 0 0 20px 20px;
    }

    &:after {
      bottom: 0;
      border-radius: 20px 20px 0 0;
    }
  }

  & + .coupon-item {
    margin-top: 10px;
  }
}
</style>
