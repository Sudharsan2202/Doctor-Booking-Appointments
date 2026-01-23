import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, changeAvailablity, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authtDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post("/login", loginDoctor)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)
doctorRouter.post("/change-availability", authDoctor, changeAvailablity)

export default doctorRouter
