import express from 'express'
import SRControllers from '../controllers/serviceRequest.js'
import AdminControllers from '../controllers/admin.js'
import validate from '../middleware/Validate.js'


const router = express.Router()

router.get('/dashboard-count',validate,AdminControllers.dashboardCount)
router.get('/list/:status',validate,AdminControllers.list)
router.put('/change-status/:id',validate,AdminControllers.changeStatus)
router.get('/service/:srno',validate, SRControllers.getBySrNo)

export default router