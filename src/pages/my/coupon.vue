<template>
	<view class="coupon">
		<view class="query-coupon-group">
			<view class="field"><van-field :value="query" placeholder="请输入兑换码" :border="false" @change="inputChange" /></view>
			<view class="btn"><van-button type="danger" size="small" :disabled="disabled">兑换</van-button></view>
		</view>
		<van-tabs :active="active" tab-active-class="tab-active" color="#c03131" @change="onChange">
			<van-tab title="未使用"></van-tab>
			<van-tab title="已使用"></van-tab>
			<van-tab title="已过期"></van-tab>
		</van-tabs>
	</view>
</template>

<script>
export default {
	data() {
		return {
			query: '',
			active: 0
		};
	},
	computed: {
		disabled() {
			return !this.query;
		}
	},
	methods: {
		inputChange(event) {
			this.query = event.detail;
		},
		onChange(event) {}
	}
};
</script>

<style lang="scss">
.coupon {
	.tab-active {
		color: #c03131;
	}
}

.query-coupon-group {
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 0 15px;

	.field {
		flex: 1;
	}

	.btn {
		flex: 0 0 60px;
		width: 60px;
		min-width: 0;
	}
}
</style>
