import express from "express";
import homeController from '../controllers/homeControllers'
import doctorController from '../controllers/doctorControllers'
import patientController from '../controllers/patientController'

let router = express.Router()

let initRouter = (app) => {
    router.get('/', homeController.homePage)


    //homeController
    router.get('/api/get-users', homeController.getUsersApi)
    router.post('/api/create-user', homeController.createUsersApi)
    router.put('/api/update-user', homeController.updateUsersApi)
    router.delete('/api/delete-user', homeController.deleteUserApi)
    router.post('/login', homeController.login)
    router.get('/get-allcode', homeController.getAllcode)
    router.post('/api/create-specialty', homeController.createSpecialty)
    router.post('/api/create-clinic', homeController.createClinic)
    router.get('/api/read-specialty', homeController.readSpecialty)
    router.get('/api/read-clinic', homeController.readClinic)
    router.post('/api/create-handbook', homeController.createHandbook)
    router.get('/api/read-handbook', homeController.readHandbook)

    //doctorController
    router.get('/api/get-doctors', doctorController.getOutstandingDoctor)
    router.post('/api/create-infor-doctors', doctorController.createInforFoctor)
    router.get('/api/get-details-infor-doctors', doctorController.getDetailInforDoctor)
    router.get('/api/get-infor-doctors', doctorController.getInforDoctor)
    router.post('/api/update-infor-doctors', doctorController.updateInforDoctor)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-doctor-schedule', doctorController.getDoctorSchedule)
    router.post('/api/upsert-doctor-infors', doctorController.upsertDoctorInfor)
    router.get('/api/get-doctor-by-id-specialty', doctorController.getDoctorByIdSpecialty)
    router.get('/api/get-list-booking-by-doctorId', doctorController.getBookingByDoctorId)
    router.post('/api/update-status-bookking-and-send-remedy', doctorController.updateStatusAndSendRemady)
    router.delete('/api/delete-bookking-completed', doctorController.deleteCompletedBooking)



    //patientController
    router.post('/api/upsert-patient-infors', patientController.upsertPatientInfor)
    router.get('/api/verify-booking', patientController.verifyBooking)







    return app.use('/', router)
}

module.exports = initRouter
