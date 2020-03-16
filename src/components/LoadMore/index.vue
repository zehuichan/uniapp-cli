<template>
	<view class="load-more">
		<view class="van-list__loading" v-if="loading && !finished">
			<van-loading type="spinner" size="16" style="vertical-align: -5px;" />
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
			tyle: Boolean,
			default: false
		},
		finished: {
			tyle: Boolean,
			default: false
		},
		loadingText: {
			tyle: String,
			default: '加载中...'
		},
		finishedText: {
			tyle: String,
			default: '没有更多了'
		}
	}
};
</script>

<style lang="scss">
	
</style>
