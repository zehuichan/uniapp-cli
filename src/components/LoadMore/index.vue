<template>
  <view class="load-more">
    <view class="van-list__loading" v-if="loading && !finished">
      <van-loading type="spinner" size="16" style="vertical-align: -5px;"/>
      <text class="van-loading__text">{{ loadingText }}</text>
    </view>
    <view class="van-list__finished-text" v-if="finished">{{ finishedText }}</view>
  </view>
</template>

<script>
  export default {
    name: 'load-more',
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      finished: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: '加载中...'
      },
      finishedText: {
        type: String,
        default: '没有更多了'
      }
    }
  }
</script>

<style lang="scss">

</style>
