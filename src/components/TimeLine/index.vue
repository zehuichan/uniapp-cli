<template>
	<view class="time-line">
		<view class="time">昨天</view>
		<view class="item" :class="item === 0 ? 'cur' : ''" v-for="item in 4" :key="item">
			<view class="content">
				<text>21:19:34</text>
				【喵星】 MX-12138 已揽收，准备发往银河系
			</view>
			<view class="content">
				<text>21:19:34</text>
				【喵星】 MX-12138 已揽收，准备发往银河系
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'TimeLine'
};
</script>

<style lang="scss">
.time-line {
	display: block;
	background-color: #fff;

	.time {
		width: 120rpx;
		text-align: center;
		padding: 20rpx 0;
		font-size: 24rpx;
		color: $desc;
		display: block;
	}

	.item {
		padding: 32rpx 32rpx 32rpx 120rpx;
		position: relative;
		display: block;
		z-index: 0;

		&.cur {
			&:before {
				color: #0081ff;
			}
		}

		&:before {
			font-family: 'iconfont';
			content: '\ec42';
			display: block;
			position: absolute;
			top: 36rpx;
			z-index: 9;
			background-color: #ffffff;
			width: 50rpx;
			height: 50rpx;
			text-align: center;
			border: none;
			line-height: 50rpx;
			left: 36rpx;
			color: #ddd;
		}

		&:after {
			content: '';
			display: block;
			position: absolute;
			width: 1rpx;
			background-color: #ddd;
			left: 60rpx;
			height: 100%;
			top: 0;
			z-index: 8;
		}

		.content {
			background-color: #f1f1f1;
			color: $text;
			padding: 32rpx;
			border-radius: 8rpx;
			display: block;
			line-height: 1.6;
			font-size: 28rpx;

			& + .content {
				margin-top: 20rpx;
			}
		}
	}
}
</style>
