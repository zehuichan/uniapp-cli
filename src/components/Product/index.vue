<template>
	<view class="product">
		<view class="thumb" :class="size">
			<van-image width="100%" height="100%" :src="thumb"></van-image>
			<view class="tag" v-if="tags && tags.length > 0">
				<van-tag v-for="(tag, index) in tags" :key="index" :color="tag.labelColor">{{ tag.title }}</van-tag>
			</view>
		</view>
		<view class="title van-ellipsis">{{ title }}</view>
		<view class="desc van-ellipsis">{{ desc }}</view>
		<view class="price van-clearfix">
			<view class="new fl">
				<text class="unit">￥</text>
				<text class="value">{{ price | format }}</text>
			</view>
			<view class="old fl" v-if="originPrice">
				<text class="unit">￥</text>
				<text class="value">{{ originPrice | format }}</text>
			</view>
		</view>
	</view>
</template>

<script>
// utils
import { oneOf } from '@/utils';

export default {
	name: 'Product',
	props: {
		thumb: String,
		title: String,
		desc: String,
		price: [Number, String],
		originPrice: [Number, String],
		tags: {
			type: Array,
			default: () => []
		},
		size: {
			type: String,
			validator(value) {
				return oneOf(value, ['xs', 'md']);
			},
			default: 'md'
		}
	}
};
</script>

<style lang="scss">
.product {
	.thumb {
		position: relative;
		text-align: center;
		background-color: #f4f4f4;
		margin-bottom: 16rpx;

		&.md {
			width: 330rpx;
			height: 330rpx;
		}

		&.xs {
			width: 210rpx;
			height: 210rpx;
		}

		.tag {
			position: absolute;
			left: 0;
			bottom: 0;

			van-tag + van-tag {
				margin-left: 10rpx;
			}
		}
	}

	.title {
		font-size: $font14;
		font-weight: 500;
	}

	.desc {
		font-size: $font12;
		color: $text-l;
	}

	.price {
		font-size: $font15;
		margin-bottom: 32rpx;

		.new {
			color: $primary;
			font-weight: 500;
		}

		.old {
			font-size: $font11;
			color: $text-ll;
			text-decoration: line-through;
			margin-top: 10rpx;
			margin-left: 16rpx;
		}

		.unit {
			font-size: 60%;
		}
	}
}
</style>
