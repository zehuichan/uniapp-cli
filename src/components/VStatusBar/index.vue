<template>
	<view :class="['v-status-bar', fixed ? 'v-status-bar--fixed' : '', border ? 'van-hairline--bottom' : '']" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
		<view class="v-status-bar__left" @click="onClickLeft">
			<block v-if="leftArrow || leftText">
				<van-icon v-if="leftArrow" size="16px" name="arrow-left" custom-class="v-status-bar__arrow" />
				<view v-if="leftText" class="v-status-bar__text" hover-class="v-status-bar__text--hover" hover-stay-time="70">{{ leftText }}</view>
			</block>
			<sort v-else name="left"></sort>
		</view>
		<view class="v-status-bar__title title-class van-ellipsis">
			<block v-if="title">{{ title }}</block>
			<slot v-else name="title" />
		</view>
		<view class="v-status-bar__right" bind:tap="onClickRight">
			<view v-if="rightText" class="v-status-bar__text" hover-class="v-status-bar__text--hover" hover-stay-time="70">{{ rightText }}</view>
			<slot v-else name="right" />
		</view>
	</view>
</template>

<script>
export default {
	name: 'v-status-bar',
	props: {
		title: String,
		fixed: Boolean,
		leftText: String,
		rightText: String,
		leftArrow: Boolean,
		border: {
			type: Boolean,
			value: true
		},
		zIndex: {
			type: Number,
			value: 1
		},
		safeAreaInsetTop: {
			type: Boolean,
			value: true
		}
	},
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar
		};
	},
	methods: {
		onClickLeft() {
			this.$emit('click-left');
		},
		onClickRight() {
			this.$emit('click-right');
		}
	}
};
</script>

<style lang="scss">
.v-status-bar {
	position: relative;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
	height: 44px;
	height: var(--nav-bar-height, 44px);
	line-height: 44px;
	line-height: var(--nav-bar-height, 44px);
	background-color: #fff;
	background-color: var(--nav-bar-background-color, #fff);
}

.v-status-bar__text {
	display: inline-block;
	vertical-align: middle;
	margin: 0 -16px;
	margin: 0 -var(--padding-md, 16px);
	padding: 0 16px;
	padding: 0 var(--padding-md, 16px);
	color: #1989fa;
	color: var(--nav-bar-text-color, #1989fa);
}

.v-status-bar__text--hover {
	background-color: #f2f3f5;
	background-color: var(--active-color, #f2f3f5);
}

.v-status-bar__arrow {
	position: relative;
	top: 4px;
	vertical-align: middle;
	font-size: 16px;
	font-size: var(--nav-bar-arrow-size, 16px);
	color: #1989fa;
	color: var(--nav-bar-text-color, #1989fa);
}

.v-status-bar__arrow + .v-status-bar__text {
	margin-left: -20px;
	padding-left: 25px;
}

.v-status-bar--fixed {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}

.v-status-bar__title {
	max-width: 60%;
	margin: 0 auto;
	color: #323233;
	color: var(--nav-bar-title-text-color, #323233);
	font-weight: 500;
	font-weight: var(--font-weight-bold, 500);
	font-size: 16px;
	font-size: var(--nav-bar-title-font-size, 16px);
}

.v-status-bar__left,
.v-status-bar__right {
	position: absolute;
	bottom: 0;
	font-size: 14px;
	font-size: var(--font-size-md, 14px);
}

.v-status-bar__left {
	left: 16px;
	left: var(--padding-md, 16px);
}

.v-status-bar__right {
	right: 16px;
	right: var(--padding-md, 16px);
}
</style>
