const getters = {
  // app
  loading: state => state.app.loading,

  // user
  avatar: state => state.user.avatar,
  mobile: state => state.user.mobile,
  gender: state => state.user.gender,
  birthday: state => state.user.birthday,
  nickname: state => state.user.nickname,

  // shopCart
  items: state => state.cart.items,

  // address
  address_list: state => state.address.address_list,
  chosen_address: state => state.address.chosen_address,

}

export default getters
