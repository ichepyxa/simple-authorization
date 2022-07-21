const Router = require('express')
const { check } = require('express-validator')
const {
	registration,
	login,
	getUsers,
} = require('../controllers/authController.js')
const roleMiddleware = require('../middlewares/roleMiddleware.js')
// const authMiddleware = require('../middlewares/authMiddleware.js')

const router = new Router()

router.post(
	'/registration',
	[
		check('username', 'Username cannot be empty').notEmpty(),
		check(
			'password',
			'Password must be more than 4 and less than 16 characters'
		).isLength({ min: 4, max: 16 }),
	],
	registration
)
router.post('/login', login)
router.get('/users', roleMiddleware(['ADMIN']), getUsers)

module.exports = router
