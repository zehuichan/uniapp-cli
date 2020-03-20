// filters
import {
  formatPhone
} from '@/filters/index.js'
// utils
import {
  saveToLocal,
  loadFromLocal,
  removeFromLocal,
  parseTime
} from '@/utils/index.js'

const state = {
  avatar: loadFromLocal('avatar') || 'https://mall.s.maizuo.com/e915e2c990c30f8efa9e30bc75da41ee.jpg',
  mobile: loadFromLocal('mobile') || formatPhone('15800066380'),
  gender: loadFromLocal('gender') || '未设置',
  birthday: loadFromLocal('birthday') || '未设置',
  nickname: loadFromLocal('nickname') || '陈泽辉',
}

const mutations = {
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
    saveToLocal('avatar', avatar)
  },
  SET_MOBILE(state, mobile) {
    state.mobile = mobile
    saveToLocal('mobile', mobile)
  },
  SET_GENDER(state, gender) {
    state.gender = gender
    saveToLocal('gender', gender)
  },
  SET_BIRTHDAY(state, birthday) {
    state.birthday = birthday
    saveToLocal('birthday', birthday)
  },
  SET_NICKNANE(state, nickname) {
    state.nickname = nickname
    saveToLocal('nickname', nickname)
  },
  LOGOUT(state) {
    state.avatar = ''
    state.mobile = ''
    state.gender = ''
    state.birthday = ''
    state.nickname = ''

    removeFromLocal('avatar')
    removeFromLocal('mobile')
    removeFromLocal('gender')
    removeFromLocal('birthday')
    removeFromLocal('nickname')
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
