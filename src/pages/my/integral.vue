<template>
	<view class="integral">
		<view class="integral-header"  style="background-image: url(https://file.sdyxmall.com/h5/v1/public/app/img/bg.71ef26b.png);">
			<view class="top">可用积分</view>
			<view class="sub">0</view>
		</view>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.integral {
	.integral-header {
		background-size: cover;
		text-align: center;
    padding: 64rpx;
		
		.top {
			font-size: $font12;
		}
		.sub {
			font-size: $font24;
			color: $primary;
			font-weight: 700;
		}
	}
}
</style>
