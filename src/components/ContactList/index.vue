<template>
	<view>
		<template v-if="poppable">
			<van-popup :show="show" position="bottom" custom-style="width:100%; height: 100%; background-color: #f2f3f5; padding-top:44px;">
				<van-nav-bar left-text="联系方式" left-arrow fixed @click-left="onClose">
					<van-button type="primary" size="mini" slot="right" @click="$emit('add')">新增</van-button>
				</van-nav-bar>
				<view class="page-wrapper padded">
					<view class="contact-list--item box-shadow base" v-for="item in list" :key="item.id">
						<view class="van-cell__value van-cell__value--alone" @click="onSelect(item)">
							<view class="van-clearfix">
								<view class="contact-cell__name fl">
									<van-tag type="primary" v-if="item.isDefault === 1">默认</van-tag>
									<text class="text">{{ item.contactName }}</text>
								</view>
								<view class="contact-cell__phone fr">{{ item.contactTel }}</view>
							</view>
							<view class="contact-cell__address van-ellipsis">公司名称：{{ item.orgName }}</view>
							<view class="contact-cell__creditcode van-ellipsis">信用代码：{{ item.orgCode }}</view>
						</view>
						<view class="contact-cell__action" @click="onDelete(item.id)">删除</view>
					</view>
				</view>
			</van-popup>
		</template>
		<template v-else>
			<view class="page-wrapper padded">
				<view class="contact-list--item box-shadow base" v-for="item in list" :key="item.id">
					<view class="van-cell__value van-cell__value--alone" @click="onSelect(item)">
						<view class="van-clearfix">
							<view class="contact-cell__name fl">
								<van-tag type="primary" v-if="item.isDefault === 1">默认</van-tag>
								<text class="text">{{ item.contactName }}</text>
							</view>
							<view class="contact-cell__phone fr">{{ item.contactTel }}</view>
						</view>
						<view class="contact-cell__address van-ellipsis">公司名称：{{ item.orgName }}</view>
						<view class="contact-cell__creditcode van-ellipsis">信用代码：{{ item.orgCode }}</view>
					</view>
					<view class="contact-cell__action" @click="onDelete(item.id)">删除</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
// api
import { companyDelete } from '@/api/user.js';
// vuex
import { mapGetters } from 'vuex';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast.js';
import Dialog from '@/wxcomponents/vant/dist/dialog/dialog.js';

export default {
	name: 'ContactList',
	props: {
		value: [String, Number],
		list: {
			type: Array,
			default: () => []
		},
		visible: Boolean,
		poppable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			show: this.visible
		};
	},
	computed: {
		...mapGetters(['userId'])
	},
	watch: {
		visible(val) {
			this.show = val !== !val;
		},
		show(val) {
			this.$emit('input', val);
			this.$emit('change', val);
		}
	},
	methods: {
		onClose() {
			this.show = false;
		},
		onSelect(val) {
			this.show = false;
			this.$emit('select', val);
		},
		onDelete(id) {
			const self = this;
			Dialog.confirm({
				message: '是否确定删除该数据？',
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			})
				.then(async () => {
					// on close
					const res = await companyDelete({ companyId: id, memberId: this.userId });
					Toast({
						message: '删除成功',
						onClose() {
							self.$emit('refresh');
							self.show = false;
						}
					});
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="scss">
.contact-list--item {
	position: relative;
	background-color: #fff;
	padding: 16rpx 32rpx;
	border-radius: 8rpx;
}

.contact-list--item + .contact-list--item {
	margin-top: 20rpx;
}

.contact-cell__name,
.contact-cell__phone {
	font-weight: 500;
	font-size: 28rpx;
}

.contact-cell__name {
	van-tag {
		margin-right: 16rpx;
		vertical-align: 1px;
	}
}

.contact-cell__phone {
	font-size: 24rpx;
	color: #666;
}

.contact-cell__address,
.contact-cell__creditcode {
	color: #7f7f8e;
	line-height: 40rpx;
	margin-top: 16rpx;
	font-size: 24rpx;
	font-weight: 500;
}

.contact-cell__creditcode {
	margin-top: 0;
}

.van-cell__value {
	position: relative;
	overflow: hidden;
	color: #969799;
	vertical-align: middle;
	word-wrap: break-word;
	padding-right: 80rpx;
}

.van-cell__value--alone {
	color: #323233;
	text-align: left;
}

.van-cell__title,
.van-cell__value {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
}

.contact-cell__action {
	position: absolute;
	top: 50%;
	right: 0;
	z-index: 1;
	transform: translateY(-50%);
	padding: 0 8px;
	border-left: 1px solid #ddd;
	color: rgb(25, 137, 250);
	font-size: 24rpx;
}
</style>
