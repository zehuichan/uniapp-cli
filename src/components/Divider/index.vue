<template>
	<view class="divider" :class="[_type, className, { 'divider-dashed': dashed }, { 'divider-with-text': $slots && $slots.default }]">
		<view class="divider-inner-text" v-if="$slots && $slots.default"><slot></slot></view>
	</view>
</template>

<script>
export default {
	name: 'Divider',
	props: {
		dashed: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'horizontal'
		},
		className: {
			type: String
		}
	},
	computed: {
		_type() {
			return `divider-${this.type}`;
		}
	}
};
</script>

<style lang="scss">
.divider {
	font-family: Monospaced Number, Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica,
		Arial, sans-serif;
	font-size: 14px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.65);
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	list-style: none;
	background: #e8e8e8;
}

.divider,
.divider-vertical {
	margin: 0 8px;
	display: inline-block;
	height: 0.9em;
	width: 1px;
	vertical-align: middle;
	position: relative;
	top: -0.06em;
}

.divider-horizontal {
	display: block;
	height: 1px;
	width: 100%;
	margin: 24px 0;
	clear: both;
}

.divider-with-text {
	display: table;
	white-space: nowrap;
	text-align: center;
	background: transparent;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.85);
	font-size: 16px;
	margin: 16px 0;

	&:before,
	&:after {
		content: '';
		display: table-cell;
		position: relative;
		top: 50%;
		width: 50%;
		border-top: 1px solid #969799;
		-webkit-transform: translateY(50%);
		-ms-transform: translateY(50%);
		transform: translateY(50%);
	}
}

.divider-inner-text {
	display: inline-block;
	padding: 0 24px;
}

.divider-dashed {
	background: none;
	border-top: 1px dashed #e8e8e8;
}
</style>
