import _ from 'lodash'
import patientServices from '../services/patientService'



let upsertPatientInfor = async (req, res) => {
    try {
        if (_.isEmpty(req.body)) {
            return res.status(200).json({ errCode: 1, message: 'Missing payload' })
        } else {
            // console.log(req.body);
            let result = await patientServices.upsertPatientInforService(req.body)
            if (!result) {
                return res.status(200).json({ errCode: 2, message: 'Fail load data from DB' })
            } else {
                return res.status(200).json(result)
            }
        }

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }
}
let verifyBooking = async (req, res) => {
    try {
        if (_.isEmpty(req.query)) {
            return res.status(200).json({ errCode: 1, message: 'Missing payload' })
        } else {
            let result = await patientServices.verifyBookingService(req.query)
            if (!result) {
                return res.status(200).json({ errCode: 2, message: 'Fail load data from DB' })
            } else {
                return res.status(200).json(result)
            }
        }

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }
}

module.exports = {
    upsertPatientInfor, verifyBooking
}