const state = {
  loading: false
}

const mutations = {
  SET_LOADING_STATE(state, flag) {
    state.loading = flag
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
