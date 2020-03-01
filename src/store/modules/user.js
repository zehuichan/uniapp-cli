// utils
import {
	saveToLocal,
	loadFromLocal,
	removeFromLocal
} from '../../utils/index.js'

const state = {
	avatar: loadFromLocal('avatar') || '',
	mobile: loadFromLocal('mobile') || '',
	email: loadFromLocal('email') || '',
	
	orgId: loadFromLocal('orgId') || '',
	orgName: loadFromLocal('orgName') || '',
	
	userId: loadFromLocal('userId') || '',
	name: loadFromLocal('name') || '游客',
}

const mutations = {
	SET_AVATAR(state, avatar) {
		state.avatar = avatar;
		saveToLocal('avatar', avatar);
	},
	SET_MOBILE(state, mobile) {
		state.mobile = mobile;
		saveToLocal('mobile', mobile);
	},
	SET_EMAIL(state, email) {
		state.email = email;
		saveToLocal('email', email);
	},
	
	SET_ORGID(state, orgId) {
		state.orgId = orgId;
		saveToLocal('orgId', orgId);
	},
	SET_ORGNANE(state, orgName) {
		state.orgName = orgName;
		saveToLocal('orgName', orgName);
	},
	
	SET_USERID(state, userId) {
		state.userId = userId;
		saveToLocal('userId', userId);
	},
	SET_NANE(state, name) {
		state.name = name;
		saveToLocal('name', name);
	},
	
	LOGOUT(state) {
		state.avatar = '';
		state.mobile = '';
		state.email = '';
		
		state.orgId = '';
		state.orgName = '';
		
		state.userId = '';
		state.name = '';
		
		removeFromLocal('avatar')
		removeFromLocal('mobile')
		removeFromLocal('email')
		
		removeFromLocal('orgId')
		removeFromLocal('orgName')
		
		removeFromLocal('userId')
		removeFromLocal('name')
	}
}

const actions = {

}

export default {
	state,
	mutations,
	actions
}
