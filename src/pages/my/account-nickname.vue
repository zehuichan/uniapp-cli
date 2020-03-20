<template>
  <view class="account-nickname">
    <van-cell-group :border="false"><van-field :value="val" placeholder="新昵称" clearable @change="inputChange" /></van-cell-group>
    <view class="desc">支持中英文、数字、“_”</view>
    <view class="btn-wrapper padded fixed-bottom"><van-button type="info" block @click="submit">保存</van-button></view>
    <!-- wxcomponents -->
    <van-toast id="van-toast" />
  </view>
</template>

<script>
// vuex
import { mapGetters, mapMutations } from 'vuex';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';

export default {
  data() {
    return {
      val: ''
    };
  },
  computed: {
    ...mapGetters(['nickname'])
  },
  onLoad() {
    this.val = this.nickname;
  },
  methods: {
    inputChange(event) {
      this.val = event.detail;
    },
    submit() {
      const self = this;
      if (!this.val) {
        Toast('请输入昵称');
        return false;
      }
      if (this.val.length > 12) {
        Toast('昵称不能超过12位字符');
        return false;
      }
      this.SET_NICKNANE(this.val);
      Toast({
        message: '设置成功',
        onClose: () => {
          uni.navigateBack({});
        }
      });
    },
    ...mapMutations(['SET_NICKNANE'])
  }
};
</script>

<style lang="scss">
.account-nickname {
  .desc {
    font-size: $font12;
    color: $text-l;
    padding: 30rpx;
  }
}
</style>
