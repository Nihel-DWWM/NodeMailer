import express from 'express'
import showForm from '../controllers/accountControllers/showForm.js'
import userReceived from '../controllers/accountControllers/userReceived.js'

const router = express.Router()

router.get('/', showForm)
router.post('/', userReceived)

export default router