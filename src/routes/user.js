import express from 'express'
import UserController from '../controllers/users.js'
import validate from '../middleware/Validate.js'
import SuperAdminGuard from '../middleware/SuperAdminGuard.js'

const router = express.Router()

router.get('/', validate, SuperAdminGuard, UserController.getAllUsers)
router.post('/',validate,SuperAdminGuard, UserController.create)
router.delete('/:id',validate,SuperAdminGuard, UserController.deleteUser)
router.post('/login', UserController.login)

export default router