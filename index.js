const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config.js')
const authRouter = require('./routes/authRouter.js')

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

async function start() {
	try {
		await mongoose.connect(config.MongoUrl)
		app.listen(config.PORT, () => {
			console.log(`Server was started on port ${config.PORT}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
