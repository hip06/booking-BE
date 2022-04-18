import doctorServices from '../services/doctorServices'
import _, { slice } from 'lodash'

let getOutstandingDoctor = async (req, res) => {
    if (req.query) {
        let result = await doctorServices.getOutstandingDoctorService(req.query)
        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(200).json({
                errCode: -1,
                message: 'Error from server...'
            })
        }
    } else {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let createInforFoctor = async (req, res) => {
    if (req.body) {
        // console.log(req.body);
        let result = await doctorServices.createInforDoctorService(req.body)
        if (result) {
            return res.status(200).json(result)

        } else {
            return res.status(200).json({
                errCode: -1,
                message: 'Error from database!'
            })
        }
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Error from client!'
        })
    }
}
let getDetailInforDoctor = async (req, res) => {
    try {
        if (!req.query || !req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            let response = await doctorServices.getDetailInforDoctorByIdService(req.query.id)
            return res.status(200).json(response)

        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let getInforDoctor = async (req, res) => {
    try {
        if (!req.query || !req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            let response = await doctorServices.getInforDoctorByIdService(req.query.id)
            return res.status(200).json(response)

        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let updateInforDoctor = async (req, res) => {
    try {
        if (!req.body && req.body !== {}) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            let response = await doctorServices.updateInforDoctorByIdService(req.body)
            return res.status(200).json(response)

        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        // console.log(req.body);
        if (!req || !req.body) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            let response = await doctorServices.bulkCreateScheduleService(req.body)
            return res.status(200).json(response)

        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let getDoctorSchedule = async (req, res) => {
    try {
        // console.log(req.body);
        if (_.isEmpty(req.query) || !req.query.id || !req.query.date) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            let response = await doctorServices.getDoctorScheduleService(req.query.id, req.query.date)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let upsertDoctorInfor = async (req, res) => {
    try {
        if (_.isEmpty(req.body)) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            let response = await doctorServices.upsertDoctorInforService(req.body.markdown, req.body.inforDoctor)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let getDoctorByIdSpecialty = async (req, res) => {
    try {
        if (_.isEmpty(req.query)) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            // console.log(req.query);
            let response = await doctorServices.getDoctorByIdSpecialtyService(req.query)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let getBookingByDoctorId = async (req, res) => {
    try {
        if (_.isEmpty(req.query) || !req.query.id || !req.query.date) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            // console.log(req.query);sdfdf
            let response = await doctorServices.getBookingByDoctorIdService(req.query)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let updateStatusAndSendRemady = async (req, res) => {
    try {
        // console.log(req.body);
        if (_.isEmpty(req.body) || !req.body.doctorId || !req.body.patientId || !req.body.token || !req.body.email) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing id doctor'
            })
        } else {
            // console.log(req.body);sdfdf
            let response = await doctorServices.updateStatusAndSendRemadyService(req.body)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}
let deleteCompletedBooking = async (req, res) => {
    try {
        if (_.isEmpty(req.query) || !req.query.token) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing token'
            })
        } else {
            // console.log(req.query);sdfdf
            let response = await doctorServices.deleteCompletedBookingService(req.query.token)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server: ' + error
        })
    }
}

module.exports = {
    getOutstandingDoctor, createInforFoctor, getDetailInforDoctor, getInforDoctor, updateInforDoctor, bulkCreateSchedule,
    getDoctorSchedule, upsertDoctorInfor, getDoctorByIdSpecialty, getBookingByDoctorId, updateStatusAndSendRemady,
    deleteCompletedBooking
}


