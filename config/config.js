module.exports = {
	PORT: process.env.PORT || 5000,
	MongoUrl: `mongodb+srv://admin:${
		process.env.password || ''
	}@cluster0.yd41umr.mongodb.net/simpleAuth?retryWrites=true&w=majority`,
	SecretKey: 'jwt-secret-key',
}
