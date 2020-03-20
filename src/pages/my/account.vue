<template>
  <view class="account">
    <van-cell-group>
      <van-cell title="头像" center is-link>
        <view class="avatar" @click="chooseImage"><van-image width="100%" height="100%" :src="avatar" round /></view>
      </van-cell>
      <van-cell title="昵称" :value="nickname" is-link @click="onClick('../my/account-nickname')" />
      <van-cell title="性别" :value="gender" is-link @click="gender_show = true" />
      <van-cell title="出生日期" :value="birthday" is-link @click="birthday_show = true" />
    </van-cell-group>
    <split />
    <van-cell-group>
      <van-cell title="手机号码" :value="mobile" is-link />
      <van-cell title="支付密码" value="未设置" is-link />
    </van-cell-group>
    <view class="btn-wrapper fixed-bottom padded"><van-button type="danger" block>退出登录</van-button></view>

    <!-- 更改性别 -->
    <van-action-sheet
      :show="gender_show"
      :actions="actions"
      :round="false"
      :close-on-click-action="false"
      description="更改性别"
      cancel-text="取消"
      @select="genderSelect"
      @close="gender_show = false"
      @cancel="gender_show = false"
    />

    <!-- 设置出生日期 -->
    <van-popup :show="birthday_show" position="bottom" @close="birthday_show = false">
      <van-datetime-picker type="date" :value="date" min-date="minDate" @confirm="birthdayConfirm" @cancel="birthday_show = false" />
    </van-popup>

    <!-- wxcomponents -->
    <van-toast id="van-toast" />
  </view>
</template>

<script>
// vuex
import { mapGetters, mapMutations } from 'vuex';
// utils
import { parseTime } from '@/utils/index.js';
// components
import Split from '@/components/Split/index.vue';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';

export default {
  data() {
    return {
      // gender
      gender_show: false,
      actions: [{ name: '男' }, { name: '女' }],
      // birthday
      birthday_show: false,
      date: new Date(2000, 0, 1).getTime(),
      minDate: new Date(1970, 0, 1).getTime()
    };
  },
  computed: {
    ...mapGetters(['avatar', 'mobile', 'gender', 'birthday', 'nickname'])
  },
  methods: {
    onClick(url) {
      this.$navigateTo(url);
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: res => {
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });
    },
    genderSelect(event) {
      console.log(event);
      this.SET_GENDER(event.detail.name);
      Toast({
        message: '设置成功',
        onClose: () => {
          this.gender_show = false;
        }
      });
    },
    birthdayConfirm(event) {
      console.log(event);
      this.SET_BIRTHDAY(parseTime(event.detail, '{y}-{m}-{d}'));
      Toast({
        message: '设置成功',
        onClose: () => {
          this.birthday_show = false;
        }
      });
    },
    ...mapMutations(['SET_GENDER', 'SET_BIRTHDAY', 'LOGOUT'])
  },
  components: {
    Split
  }
};
</script>

<style lang="scss">
.account {
  .avatar {
    width: 80rpx;
    height: 80rpx;
    margin-top: 16rpx;
    display: inline-block;
  }
}
</style>
