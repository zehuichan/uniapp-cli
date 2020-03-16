const getters = {
	// app
	loading: state => state.app.loading,

	// user
	avatar: state => state.user.avatar,
	mobile: state => state.user.mobile,
	email: state => state.user.email,

	orgId: state => state.user.orgId,
	orgName: state => state.user.orgName,

	userId: state => state.user.userId,
	name: state => state.user.name,

	// shopCart
	items: state => state.cart.items
}

export default getters
