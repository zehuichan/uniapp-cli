<template>
	<view :style="[splitStyle, { height: `${height}rpx` }]"></view>
</template>

<script>
export default {
	name: 'Split',
	props: {
		splitStyle: {},
		height: {
			type: Number,
			default: 20
		}
	}
};
</script>

<style>
.split {
}
</style>
