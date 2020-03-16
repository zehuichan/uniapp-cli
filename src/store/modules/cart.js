const state = {
	items: []
}

const mutations = {
	setItems: (state, products) => {
		state.items = products
	},
	updateItems: (state, {
		productId,
		count
	}) => {
		const cartItem = state.items.find(item => item.productId == productId)
		cartItem.count += count
	},
	changeItems: (state, {
		productId,
		count
	}) => {
		const cartItem = state.items.find(item => item.productId == productId)
		cartItem.count = count
	},
	deleteItems: (state, productId) => {
		const _items = state.items.filter(item => item.productId != productId)
		state.items = _items
	},
}

const actions = {}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
