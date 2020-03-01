<template>
	<view class="search">
		<van-search :value="kw" placeholder="搜索" use-action-slot @change="inputChange" @search="inputChange"><view slot="action" @click="onClick">搜索</view></van-search>
		<view class="history">
			<view class="history-header van-clearfix"><view class="title fl">热门搜索</view></view>
			<view class="history-body van-hairline--bottom">
				<view class="tag tap-active" v-for="(tag, index) in hots" :key="index" @click="onSelect(tag)">{{ tag }}</view>
			</view>
		</view>
		<view class="history">
			<view class="history-header van-clearfix">
				<view class="title fl">历史搜索</view>
				<view class="action fr" @click="onClean"><text class="iconfont icon-ashbin"></text></view>
			</view>
			<view class="history-body">
				<view class="tag tap-active" v-for="(tag, index) in keywords" :key="index" @click="onSelect(tag)">{{ tag }}</view>
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
// utils
import { saveToLocal, loadFromLocal } from '@/utils/index.js';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';

export default {
	data() {
		return {
			kw: '',
			hots: ['抽纸', '米', '洗衣液', '食用油', '礼包', '牙膏', '拖鞋', '面膜', '口红', '风扇', '伞', '儿童', '特产'],
			keywords: loadFromLocal('keywords') || []
		};
	},
	methods: {
		inputChange(event) {
			this.kw = event.detail;
		},
		onClick() {
			// 去重
			this.keywords.push(this.kw);
			this.keywords = Array.from(new Set(this.keywords));
			// 写入内存
			saveToLocal('keywords', this.keywords);
			// 提示
			Toast('搜索：' + this.kw);
			// 重置kw
			this.kw = '';
		},
		onSelect(tag) {
			this.kw = tag;
			// 提示
			Toast('搜索：' + this.kw);
		},
		onClean() {
			this.keywords = [];
			// 写入内存
			saveToLocal('keywords', this.keywords);
		}
	}
};
</script>

<style lang="scss">
.search {
}
.history-header {
	font-size: $font14;
	padding: 16rpx 32rpx;

	.title {
		font-weight: 600;
	}

	.action {
		.iconfont {
			font-size: 46rpx;
			line-height: 1;
		}
	}
}

.history-body {
	padding: 0 $gutter-16;

	.tag {
		display: inline-block;
		background-color: #fff;
		padding: 8rpx 32rpx;
		border-radius: 8rpx;
		color: $text-l;
		font-size: 26rpx;
		margin-right: 16rpx;
		margin-bottom: 16rpx;
	}
}
</style>
