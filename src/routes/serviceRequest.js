import express from 'express'
import SRControllers from '../controllers/serviceRequest.js'


const router = express.Router()

router.post('/create',SRControllers.create)
router.get('/:srno',SRControllers.getBySrNo)

export default router