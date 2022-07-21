const jwt = require('jsonwebtoken')
const { SecretKey } = require('../config/config.js')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(403).json({ message: 'User is not authorized' })
		}

		const decodedData = jwt.verify(token, SecretKey)
		req.user = decodedData

		next()
	} catch (error) {
		return res.status(403).json({ message: 'User is not authorized' })
	}
}
