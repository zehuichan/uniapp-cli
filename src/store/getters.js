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
  items_length: state => {
    return state.cart.items.reduce((prev, curr) => ~~curr.count + prev, 0)
  },

  // address
  address_list: state => state.address.address_list,
  default_list: state => state.address.address_list.find((item) => item.isDefault === 1),
  chosen_address: state => state.address.chosen_address,

  // coupon
  coupon: state => state.coupon.coupon,

}

export default getters
