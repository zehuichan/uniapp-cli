<template>
	<view class="contact-edit">
		<van-popup :show="show" position="bottom" custom-style="width:100%; height: 100%; background-color: #f2f3f5; padding-top:44px;">
			<van-nav-bar left-text="新增" left-arrow fixed @click-left="onClose">
				<!-- <van-button type="primary" size="mini" slot="right" @click="$emit('add')">删除</van-button> -->
			</van-nav-bar>
			<van-cell-group :border="false">
				<van-field :value="dataForm.contactTel" label="联系方式" placeholder="请填写正确手机号，方便与您联系" clearable @change="inputChange('contactTel', $event)" />
				<van-field :value="dataForm.contactName" label="联系人" placeholder="请填写联系人姓名" clearable @change="inputChange('contactName', $event)" />
				<van-field :value="dataForm.orgName" label="公司名称" placeholder="请填写正确公司名称" clearable @change="inputChange('orgName', $event)" />
				<van-field :value="dataForm.orgCode" label="信用代码" placeholder="请填写正确信用代码" clearable @change="inputChange('orgCode', $event)" />
			</van-cell-group>
			<split />
			<van-cell-group :border="false">
				<van-cell title="是否默认"><van-switch :checked="dataForm.isDefault" :active-value="1" :inactive-value="0" size="24px" @change="onChange" /></van-cell>
			</van-cell-group>
			<view class="btn-wrapper padded fixed-bottom"><van-button type="info" block @click="submit">保存</van-button></view>
		</van-popup>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
// api
import { addCompany } from '@/api/home.js';
// vuex
import { mapGetters } from 'vuex';
// utils
import { validatePhone } from '@/utils/validate.js';
// components
import Split from '@/components/Split/index.vue';
// wxcomponents
import Toast from '@/wxcomponents/vant/dist/toast/toast';

export default {
	name: 'ContactEdit',
	props: {
		value: [String, Number],
		visible: Boolean
	},
	data() {
		return {
			show: this.visible,
			dataForm: {
				contactTel: '',
				contactName: '',
				orgName: '',
				orgCode: '',
				isDefault: 1,
				memberId: ''
			}
		};
	},
	computed: {
		...mapGetters(['userId'])
	},
	watch: {
		visible(val) {
			this.show = val !== !val;
			if (this.show) {
				this.dataForm = {
					contactTel: '',
					contactName: '',
					orgName: '',
					orgCode: '',
					isDefault: 1,
					memberId: ''
				};
			}
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
		inputChange(key, { detail }) {
			this.dataForm[key] = detail;
		},
		onChange({ detail }) {
			this.dataForm.isDefault = detail;
		},
		async submit() {
			if (!this.dataForm.contactTel) {
				Toast('请输入手机号码');
				return false;
			}
			if (!validatePhone(this.dataForm.contactTel)) {
				Toast('请填写正确的手机号码');
				return false;
			}
			if (!this.dataForm.contactName) {
				Toast('请输入联系人！');
				return;
			}
			if (!this.dataForm.orgName) {
				Toast('请输入公司名称！');
				return;
			}
			if (!this.dataForm.orgCode) {
				Toast('请输入信用代码！');
				return;
			}

			this.dataForm.memberId = this.userId;
			const res = await addCompany(this.dataForm);
			if (res.data.resCode == 'success') {
				this.$emit('refresh');
				Toast('保存成功');
				this.show = false;
			}
		}
	},
	components: {
		Split
	}
};
</script>

<style lang="scss">
.contact-edit {
}
</style>
