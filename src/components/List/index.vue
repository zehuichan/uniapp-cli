<template>
	<scroll-view class="van-list" scroll-y @scrolltolower="lower" :style="_style">
		<slot></slot>
		<view class="van-list__loading" v-if="loading && !finished">
			<van-loading type="spinner" size="16" style="vertical-align: -5px;" />
			<text class="van-loading__text">{{ loadingText }}</text>
		</view>
		<view class="van-list__finished-text" v-if="finished">{{ finishedText }}</view>
	</scroll-view>
</template>

<script>
const REGEXP = /^\d+(\.\d+)?$/;

function addUnit(value) {
	if (value == null) {
		return undefined;
	}

	return REGEXP.test('' + value) ? value + 'px' : value;
}

export default {
	name: 'List',
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
		},
		top: {
			type: [String, Number],
			default: '0px'
		}
	},
	computed: {
		_style() {
			const _h = addUnit(this.top);
			return `height:calc(100vh - ${_h});`;
		}
	},
	// 加载更多
	onReachBottom() {},
	methods: {
		lower(event) {
			if (!this.finished) {
				this.$emit('load');
			}
		}
	}
};
</script>

<style lang="scss"></style>
