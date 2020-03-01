<template>
	<view class="card">
		<view class="card__header van-hairline--bottom" v-if="$slots.header || header">
			<slot name="header">{{ header }}</slot>
		</view>
		<view class="card__body" :style="bodyStyle"><slot></slot></view>
		<view class="card__extra" :style="extraStyle" v-if="$slots.extra || extra">
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
		footer: {}
	}
};
</script>

<style lang="scss">
.card {
	position: relative;
	width: 100%;
	border-radius: 8rpx;
	background-color: #fff;
	overflow: hidden;
	color: $text;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
	margin-top: 20rpx;

	.card__header {
		padding: 22rpx 32rpx;
		box-sizing: border-box;
	}

	.card__body {
		padding: 32rpx;
	}
}
</style>
