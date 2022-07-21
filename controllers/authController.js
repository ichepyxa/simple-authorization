const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const Role = require('../models/Role')
const { SecretKey } = require('../config/config.js')

const generateAccessToken = (id, roles) => {
	const payload = { id, roles }

	return jwt.sign(payload, SecretKey, { expiresIn: '24h' })
}

const registration = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ message: 'A user with the same name already exists', errors })
		}

		const { username, password } = req.body
		const candidate = await User.findOne({ username })

		if (candidate) {
			return res
				.status(400)
				.json({ message: 'A user with the same name already exists' })
		}

		const hashPassword = bcrypt.hashSync(password, 10)
		const userRole = await Role.findOne({ value: 'USER' })
		const user = await User.create({
			username,
			password: hashPassword,
			roles: [userRole.value],
		})

		return res.json({ message: 'User successfully created' })
	} catch (error) {
		res.status(400).json({ message: 'Registration error' })
	}
}

const login = async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({ username })
		if (!user) {
			return res.status(400).json({ message: `User ${username} not found` })
		}

		const isValidPassword = bcrypt.compareSync(password, user.password)
		if (!isValidPassword) {
			return res.status(400).json({ message: 'Wrong password entered' })
		}

		const token = generateAccessToken(user._id, user.roles)
		return res.json({ accessToken: token })
	} catch (error) {
		res.status(400).json({ message: 'Login error' })
	}
}

const getUsers = async (req, res) => {
	try {
		const users = await User.find()
		return res.json(users)
	} catch (error) {
		res.status(400).json({ message: 'Get users error' })
	}
}

module.exports = {
	registration,
	login,
	getUsers,
}
