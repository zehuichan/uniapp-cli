<template>
	<view class="sort">
		<view class="vertical-box">
			<!-- 左侧-分组-start -->
			<scroll-view class="vertical-menu nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:100vh">
				<view v-for="(item, index) in nav" :key="item.id" :id="'nav-' + item.id" class="cu-item" :class="index == currentIndex ? 'cur' : ''" @click="handleTabSelect(item, index)">
					{{ item.name }}
				</view>
			</scroll-view>
			<!-- 左侧-分组-end -->

			<!-- 右侧-单元-start -->
			<scroll-view class="vertical-main" scroll-y scroll-with-animation :scroll-into-view="'main-' + mainCur" @scroll="handleScroll" style="height:100vh">
				<view class="vertical-main-item" :class="index === main.length - 1 ? 'end' : ''" v-for="(item, index) in main" :key="item.id" :id="'main-' + item.id">
					<view class="vertical-main__banner box-shadow base"><van-image width="100%" height="100%" :src="item.imgUrl"></van-image></view>
					<view class="vertical-main__title">{{ item.name }}</view>
					<view class="vertical-main__list">
						<view class="vertical-main__list-item" v-for="(elem, idx) in item.list" :key="idx" @click="onClick('../product/list')">
							<view class="image"><van-image width="100%" height="100%" :src="elem.imgUrl"></van-image></view>
							<view class="title">{{ elem.masterTitle }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧-单元-end -->
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast';

// mockData
import { nav } from './mock.js';

export default {
	data() {
		return {
			nav: [],
			main: [],

			verticalNavTop: 0,
			scrollY: 0,
			listHeight: [],
			tabCur: 0,
			mainCur: 0,

			show: false
		};
	},
	computed: {
		currentIndex() {
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i + 1];
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i;
				}
			}
			return 0;
		}
	},
	onLoad() {
		this._listAll();
	},
	methods: {
		onClick(url) {
			this.$navigateTo(url);
		},
		_listAll() {
			this.nav = nav.map(item => ({
				id: item.categoryId,
				name: item.name
			}));
			this.main = nav.map(item => ({
				id: item.categoryId,
				imgUrl: item.imgUrl,
				name: item.name,
				list: item.list
			}));
			this.$nextTick(() => {
				this._calculateHeight();
			});
		},
		handleTabSelect(item, index) {
			console.log(item, index);
			this.mainCur = item.id;
			this.verticalNavTop = (index - 1) * 50;
		},
		handleScroll(event) {
			//支付宝小程序暂时不支持双向联动
			// #ifdef MP-ALIPAY
			return false;
			// #endif

			this.$nextTick(() => {
				this.scrollY = event.detail.scrollTop + 10;
				this.verticalNavTop = (this.currentIndex - 1) * 50;
			});
		},
		_calculateHeight() {
			let self = this;
			let height = 0;
			this.listHeight.push(height);
			for (let i = 0; i < this.nav.length; i++) {
				let view = uni.createSelectorQuery().select('#main-' + this.nav[i].id);
				view
					.boundingClientRect(ret => {
						height += ret.height;
						this.listHeight.push(height);
					})
					.exec();
			}
		}
	}
};
</script>

<style lang="scss">
.vertical-box {
	display: flex;
}

.vertical-main {
	flex: 1;
	background-color: #fff;

	.vertical-main-item {
		padding-top: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		
		&.end {
			height: 100vh;
		}
	}

	.vertical-main__banner {
		height: 200rpx;
		background-color: #e0e0e0;
		border-radius: 8rpx;
	}

	.vertical-main__title {
		font-size: $font16;
		color: $text;
		font-weight: 600;
		text-align: center;
		margin: 30rpx 0;
	}

	.vertical-main__list {
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;

		.vertical-main__list-item {
			position: relative;
			flex: 0 0 (100% / 3);
			background-color: #fff;
			text-align: center;
			font-size: $font12;

			.image {
				width: 108rpx;
				height: 108rpx;
				margin: 0 auto;
			}

			.title {
				padding: 16rpx 0 32rpx;
			}
		}
	}
}

.vertical-menu.nav {
	flex: 0 0 160rpx;
	width: 160rpx;
	min-width: 0;
	white-space: initial;
	background-color: #f4f4f4;
}

.vertical-menu.nav .cu-item {
	text-align: center;
	height: 50px;
	line-height: 50px;
	font-size: $font12;
	color: $text-l;
}

.vertical-menu.nav .cu-item.cur {
	color: $primary;
	font-weight: 600;
	background-color: #fff;
}
</style>
