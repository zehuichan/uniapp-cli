<template>
	<view class="product-detail">
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular autoplay interval="3000" duration="500" @change="swiperChange">
					<swiper-item v-for="(item, index) in swipers" :key="index"><image :src="item" mode="scaleToFill"></image></swiper-item>
				</swiper>
				<view class="indicator">{{ current_swiper + 1 }} / {{ swipers.length }}</view>
			</view>
		</view>
		<view class="detailed">
			<view class="title van-multi-ellipsis--l2">Fabric Lab 男款高领羊毛衫</view>
			<view class="desc van-ellipsis">精仿羊毛混纺 保暖御寒 复古时尚</view>
			<view class="price van-clearfix">
				<view class="new fl">
					<text class="unit">￥</text>
					<text class="value">279</text>
				</view>
				<view class="old fl">
					<text class="unit">￥</text>
					<text class="value">279</text>
				</view>
				<view class="sale fr">634人购买</view>
			</view>
		</view>
		<view class="attrs van-hairline--top">
			<view class="attrs-item" v-for="item in attr_list" :key="item.attrId">
				<text class="iconfont icon-success"></text>
				{{ item.attrValue }}
			</view>
		</view>
		<split />
		<view class="introduce">
			<view class="title"><view class="inner-text">商品详情</view></view>
			<rich-text :nodes="content"></rich-text>
		</view>
		<van-goods-action>
			<van-goods-action-icon icon="shop-o" text="首页" @click="onClickIcon" />
			<van-goods-action-icon icon="shopping-cart-o" text="购物车" @click="onClickIcon" />
			<van-goods-action-button text="加入购物车" type="warning" @click="onClickButton" />
			<van-goods-action-button text="立即购买" @click="onClickButton" />
		</van-goods-action>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
// utils
import htmlParser from '@/utils/html-parser';
// components
import Split from '@/components/Split/index.vue';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';

const FAIL_CONTENT = '<p>获取信息失败</p>';
const SUCCESS_CONTENT =
	'<p><img style="width: 750px; height: 930px;" src="https://mall.s.maizuo.com/78f631d4ecf38ac5ef489a3b706b12b1.jpg"><img style="width: 750px; height: 921px;" src="https://mall.s.maizuo.com/91f344c1751f39652d0821639cf46ae2.jpg"><img style="width: 750px; height: 1204px;" src="https://mall.s.maizuo.com/0d5863399be4a917f075d8bd1f4757a9.jpg"><img style="width: 750px; height: 640px;" src="https://mall.s.maizuo.com/177486c3ac18653416b34d59f36a2227.jpg"><img style="width: 750px; height: 374px;" src="https://mall.s.maizuo.com/280fb9d654dddccc151f14fad31eb4ed.jpg"><img style="width: 750px; height: 691px;" src="https://mall.s.maizuo.com/6359556d2e2f7faf98c0bd1ba230b5b1.jpg"><img style="width: 750px; height: 279px;" src="https://mall.s.maizuo.com/780c2985856ab733aff5d4caea633eb4.jpg"><img style="width: 750px; height: 891px;" src="https://mall.s.maizuo.com/89733dce281a0d51bb74d9cd10a47718.jpg"><img style="width: 750px; height: 773px;" src="https://mall.s.maizuo.com/30989ae5ab0fd41f8b16329d638be634.jpg"><img style="width: 750px; height: 353px;" src="https://mall.s.maizuo.com/8d5569a33005f97fcb4b28c049008e3f.jpg"><img style="width: 750px; height: 1050px;" src="https://mall.s.maizuo.com/51b3566653772b361d7033aa6cf42b63.jpg"><img style="width: 750px; height: 923px;" src="https://mall.s.maizuo.com/d588a33a489bcaee263cdff3faa07924.jpg"><img style="width: 750px; height: 1003px;" src="https://mall.s.maizuo.com/7b78be00e034f95051cd399670a5c549.jpg"><img style="width: 750px; height: 1130px;" src="https://mall.s.maizuo.com/aec3ae9162886e9676e83f16c69fff7c.jpg"><img style="width: 750px; height: 1066px;" src="https://mall.s.maizuo.com/ac19396593fd4d826b3cc7b738de3dee.jpg"><img style="width: 750px; height: 964px;" src="https://mall.s.maizuo.com/48ea077baa258838ddb22add1358198d.jpg"><img style="width: 750px; height: 227px;" src="https://mall.s.maizuo.com/7d3c8de581dd2878c64156461cdfd727.jpg"><br></p>"';
function parseImgs(nodes) {
	nodes.forEach(node => {
		if (node.name === 'img' && node.attrs && node.attrs['style']) {
			const sizes = node.attrs['style'].replace(/width: (\d+)px; height: (\d+)px;/g, '$1,$2').split(',');
			const width = uni.upx2px(sizes[0]);
			const height = uni.upx2px(sizes[1]);
			node.attrs.style = `width:${width}px;height:${height}px;`;
		}
		if (Array.isArray(node.children)) {
			parseImgs(node.children);
		}
	});
	return nodes;
}

export default {
	data() {
		return {
			swipers: [
				'https://mall.s.maizuo.com/2adcb0fdbedcd1c92489362f45f15903.png?x-oss-process=image/resize,w_563',
				'https://mall.s.maizuo.com/42ba066e26e392f467d707a998416eb4.jpg?x-oss-process=image/resize,w_563',
				'https://mall.s.maizuo.com/01879d5b887a055f51e3c92637357af1.jpg?x-oss-process=image/resize,w_563',
				'https://mall.s.maizuo.com/252929e2e93c836a3affdc1c7779fe40.jpg?x-oss-process=image/resize,w_563'
			],
			current_swiper: 0,
			attr_list: [
				{ attrId: 1001, attrName: 'serviceRule', attrValue: '正品保证' },
				{ attrId: 1001, attrName: 'serviceRule', attrValue: '满99元包邮' },
				{ attrId: 1001, attrName: 'serviceRule', attrValue: '7天无理由退换货' }
			],
			content: []
		};
	},
	onLoad() {
		let content = SUCCESS_CONTENT;
		const nodes = htmlParser(content);
		parseImgs(nodes);
		this.content = nodes;
	},
	methods: {
		// 轮播图指示器
		swiperChange(event) {
			this.current_swiper = event.detail.current;
		},
		onClickIcon() {
			Toast('点击图标');
		},

		onClickButton() {
			Toast('点击按钮');
		}
	},
	components: {
		Split
	}
};
</script>

<style lang="scss">
.product-detail {
	.swiper {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		background: #f9f9f9;

		.swiper-box {
			overflow: hidden;
			//兼容ios，微信小程序
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;

			swiper {
				width: 100%;
				height: 100%;

				swiper-item {
					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
				color: $text;
				font-size: $font12;
				padding: 4rpx 16rpx;
				background-color: #f9f9f9;
				border: 1px solid $text-l;
			}
		}
	}

	.detailed {
		padding: 30rpx;
		background-color: #fff;

		.title {
			font-size: $font15;
			max-height: 88rpx;
		}

		.desc {
			font-size: $font13;
			color: #797d82;
			margin-top: 16rpx;
		}

		.price {
			margin-top: 20rpx;
			height: 60rpx;
			font-size: $font20;

			.new {
				color: $primary;
				font-weight: 500;
			}

			.old {
				color: $text-ll;
				font-size: $font12;
				text-decoration: line-through;
				margin-top: 18rpx;
				margin-left: 16rpx;
			}

			.sale {
				color: $text-ll;
				font-size: $font12;
				margin-top: 18rpx;
			}

			.unit {
				font-size: 50%;
			}
		}
	}
}

.attrs {
	background-color: #fff;
	font-size: $font12;
	color: $text-l;

	.attrs-item {
		display: inline-block;
		line-height: 48rpx;
		padding: 10px 0 10px 15px;

		.iconfont {
			font-size: $font20;
			color: $primary;
			line-height: 1;
			vertical-align: -6rpx;
			margin-right: 6rpx;
		}
	}
}

.introduce {
	background-color: #fff;

	.title {
		font-size: $font13;
		text-align: center;
		padding: 44rpx 0;

		.inner-text {
			position: relative;
			text-align: center;
			font-weight: 400;
			color: $text-l;

			&:before {
				left: 35.5%;
			}

			&:after {
				right: 35.5%;
			}

			&:before,
			&:after {
				content: '';
				position: absolute;
				top: 52%;
				background-color: #ededed;
				width: 36rpx;
				height: 2rpx;
			}
		}
	}
}
</style>
