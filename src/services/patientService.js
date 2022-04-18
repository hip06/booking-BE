import db from '../models'
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';

let upsertPatientInforService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (body.email) {
                let user = await db.User.findOrCreate({
                    where: { email: body.email },
                    defaults: {
                        email: body.email,
                        roleId: 'R3',
                        phoneNumber: body.phoneNumber,
                        address: body.address,
                        firstName: body.fullName
                    }
                })
                if (user) {
                    let token = uuidv4();
                    let isCreatedBooking = await db.Booking.findOrCreate({
                        where: { timeType: body.timeType, date: body.date, patientId: user[0].id, doctorId: body.doctorId },
                        defaults: {
                            statusId: 'S1',
                            doctorId: body.doctorId,
                            patientId: user[0].id,
                            date: body.date,
                            timeType: body.timeType,
                            token: token,
                            reason: body.reason
                        }
                    })
                    // console.log(isCreatedBooking);
                    if (isCreatedBooking[1]) {
                        await emailService.sendEmailVerify({
                            email: user[0].email,
                            fullName: user[0].lastName ? user[0].firstName + ' ' + user[0].lastName : user[0].firstName,
                            time: body.timeType + ' - ' + body.date,
                            doctorName: body.doctorName,
                            reason: body.reason,
                            doctorId: body.doctorId,
                            token: token
                        })
                        resolve({ errCode: 0, message: 'Create OK!' })
                    } else {
                        resolve({ errCode: 2, message: 'Schedule has been duplicated, email has been sent before...pls check again!' })

                    }
                }

            } else {
                resolve({ errCode: 2, message: 'Missing fields from client side!' })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let verifyBookingService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (query.doctorId && query.token) {
                let booking = await db.Booking.findOne({
                    where: { doctorId: query.doctorId, token: query.token },//dsds
                    attributes: ['statusId']
                })

                if (!booking) {
                    resolve({ errCode: 4, message: 'Error from DB' })
                } else {
                    if (booking.statusId === 'S2') {
                        resolve({ errCode: 5, message: 'Email already has been confirmed!' })
                    } else {
                        await db.Booking.update({
                            statusId: 'S2'
                        }, {
                            where: { doctorId: query.doctorId, token: query.token }
                        })

                        resolve({ errCode: 0, message: 'Create OK!' })
                    }
                }

            } else {
                resolve({ errCode: 2, message: 'Missing fields from client side!' })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    upsertPatientInforService, verifyBookingService
}