const baseUrl = 'https://iot.gaobat.com:8443/thingsnet'

function http({
	url,
	method,
	header,
	data
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}${url}`,
			method: method,
			header: header,
			data: data,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default http
