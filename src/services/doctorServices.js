import db from '../models'
require('dotenv').config()
import _ from 'lodash'
import emailService from './emailService'


let maxNumber = process.env.MAX_NUMBER

let getOutstandingDoctorService = (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await db.User.findAll({
                where: { roleId: req.type },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVI'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVI'] },
                ],
                raw: true,
                nest: true
            })
            // console.log(response);
            let endedData = []
            if (_.isEmpty(response)) {
                resolve({
                    errCode: 2,
                    message: 'error from db'
                })
            } else {
                for (let i = 0; i < response.length; i++) {
                    let resultFromInfoDoctor = await db.Info_Doctor.findOne({
                        where: { doctorId: response[i].id },
                        attributes: ['specialtyId'],
                        include: [
                            { model: db.Spec, attributes: ['name'] }
                        ],
                        raw: true,
                        nest: true
                    })
                    endedData.push({ ...resultFromInfoDoctor, ...response[i] })

                }
            }
            resolve({ errCode: 0, data: endedData })
        } catch (error) {
            reject(error)
        }
    })
}
let createInforDoctorService = (inforDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inforDoctor.contentHTML && inforDoctor.contentIntroducion && inforDoctor.selectedOption.id) {
                await db.Markdown.create({
                    contentHTML: inforDoctor.contentHTML,
                    contentMarkdown: inforDoctor.contentMarkdown,
                    introduction: inforDoctor.contentIntroducion,
                    doctorId: inforDoctor.selectedOption.id
                })
                resolve({ errCode: 0, message: 'Create OK!' })
            } else {
                resolve({ errCode: 2, message: 'Missing fields from client side!' })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailInforDoctorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'introduction'] },
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVI'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVI'] },
                ],
                raw: true,
                nest: true
            })
            response ? resolve({ errCode: 0, data: response, message: 'OK' }) : resolve({ errCode: 2, data: [], message: 'ID doctor not exist!' })

        } catch (error) {
            reject(error)
        }
    })
}
let getInforDoctorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let responseMarkdown = await db.Markdown.findOne({
                where: { doctorId: id }
            })
            let responseDoctorInfor = await db.Info_Doctor.findOne({
                where: { doctorId: id },
                include: [
                    { model: db.Allcode, attributes: ['valueVI'], as: 'price' },
                    { model: db.Allcode, attributes: ['valueVI'], as: 'province' },
                    { model: db.Allcode, attributes: ['valueVI'], as: 'payment' },
                ],
                raw: true,
                nest: true
            })
            responseMarkdown && responseDoctorInfor ? resolve({ errCode: 0, data: { responseMarkdown, responseDoctorInfor }, message: 'OK' }) : resolve({ errCode: 2, data: [], message: 'ID doctor not exist!' })

        } catch (error) {
            reject(error)
        }
    })
}
let updateInforDoctorByIdService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.selectedOption.id) {
                await db.Markdown.update({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    introduction: data.contentIntroducion
                }, {
                    where: { doctorId: data.selectedOption.id }
                })
                resolve({ errCode: 0, message: 'OK' })
            } else {
                resolve({ errCode: 2, message: 'ID doctor not exist!' })
            }
            // resolve('OK')
            // response ? resolve({ errCode: 0, data: response, message: 'OK' }) : resolve({ errCode: 2, data: [], message: 'ID doctor not exist!' })

        } catch (error) {
            reject(error)
        }
    })
}
let bulkCreateScheduleService = (dataForBulkCreate) => {
    return new Promise(async (resolve, reject) => {
        try {
            //config data from client
            let comfirmedData = dataForBulkCreate && dataForBulkCreate.length > 0 && dataForBulkCreate.map(item => {
                return {
                    ...item,
                    maxNumber: +maxNumber
                }
            })
            //config data from db
            let dataFromDB = await db.Schedule.findAll({
                where: {
                    doctorId: dataForBulkCreate[0].doctorId
                },
                attributes: ['doctorId', 'timeType', 'date', 'maxNumber']
            })
            //find element duplicate
            let listIndex = []
            comfirmedData.forEach((item, index) => {
                dataFromDB.forEach(item2 => {
                    if (item.timeType === item2.timeType && item.date === item2.date) {
                        return listIndex.push(index)
                    }
                })
            })

            if (listIndex.length === 0) {
                await db.Schedule.bulkCreate(comfirmedData)
                resolve({ errCode: 0, message: 'OK' })
            } else {
                for (let i = 0; i < listIndex.length; ++i) {
                    let newIndex = listIndex[i] - i
                    comfirmedData.splice(newIndex, 1)
                }
                if (comfirmedData.length === 0) {
                    resolve({
                        errCode: 3,
                        message: 'Time has been duplicated!'
                    })
                }
                await db.Schedule.bulkCreate(comfirmedData)
                resolve({ errCode: 0, message: 'OK' })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDoctorScheduleService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Schedule.findAll({
                where: { doctorId: +doctorId, date: date },
                attributes: ['maxNumber', 'timeType', 'doctorId', 'date'],
                include: [
                    { model: db.Allcode, attributes: ['id', 'valueVI'] }
                ],
                raw: true,
                nest: true
            })
            if (_.isEmpty(response)) {
                resolve({
                    errCode: 2,
                    message: `Schedule of id: ${doctorId} and date: ${date} is empty!`
                })
            } else {

                resolve({
                    errCode: 0,
                    response: response,
                    message: 'OK'
                })
            }
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let upsertDoctorInforService = (markdown, inforDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (markdown && inforDoctor) {
                let dataMarkdown = {
                    doctorId: markdown.selectedDoctor.id,
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    introduction: markdown.contentIntroducion
                }
                let dataInforDoctor = {
                    doctorId: inforDoctor.selectedDoctor.id,
                    priceId: inforDoctor.selectedPrice.value,
                    provinceId: inforDoctor.selectedProvince.value,
                    paymentId: inforDoctor.selectedPayment.value,
                    addressClinic: inforDoctor.addressClinic,
                    clinicName: inforDoctor.clinicName,
                    note: inforDoctor.note,
                    specialtyId: inforDoctor.selectedSpecialty.id,
                    clinicId: inforDoctor.selectedClinic.id
                }
                // console.log('check before access db', dataInforDoctor);
                let resultMarkdown = await db.Markdown.findOne({
                    where: { doctorId: dataMarkdown.doctorId }
                })
                let resultInforDoctor = await db.Info_Doctor.findOne({
                    where: { doctorId: dataInforDoctor.doctorId }
                })

                if (_.isEmpty(resultMarkdown)) {
                    //create
                    await db.Markdown.create({
                        doctorId: dataMarkdown.doctorId,
                        contentHTML: dataMarkdown.contentHTML,
                        contentMarkdown: dataMarkdown.contentMarkdown,
                        introduction: dataMarkdown.introduction
                    })

                } else {
                    //update
                    await db.Markdown.update({
                        contentHTML: dataMarkdown.contentHTML,
                        contentMarkdown: dataMarkdown.contentMarkdown,
                        introduction: dataMarkdown.introduction
                    },
                        { where: { doctorId: dataMarkdown.doctorId } }
                    )

                }
                if (_.isEmpty(resultInforDoctor)) {
                    //create
                    await db.Info_Doctor.create({
                        doctorId: dataInforDoctor.doctorId,
                        priceId: dataInforDoctor.priceId,
                        provinceId: dataInforDoctor.provinceId,
                        paymentId: dataInforDoctor.paymentId,
                        addressClinic: dataInforDoctor.addressClinic,
                        nameClinic: dataInforDoctor.clinicName,
                        note: dataInforDoctor.note,
                        specialtyId: dataInforDoctor.specialtyId,
                        clinicId: dataInforDoctor.clinicId
                    })
                } else {
                    //update
                    // console.log('case update', dataInforDoctor);
                    await db.Info_Doctor.update({
                        priceId: dataInforDoctor.priceId,
                        provinceId: dataInforDoctor.provinceId,
                        paymentId: dataInforDoctor.paymentId,
                        addressClinic: dataInforDoctor.addressClinic,
                        nameClinic: dataInforDoctor.clinicName,
                        note: dataInforDoctor.note,
                        specialtyId: dataInforDoctor.specialtyId,
                        clinicId: dataInforDoctor.clinicId
                    },
                        { where: { doctorId: dataInforDoctor.doctorId } }
                    )
                }
                resolve({ errCode: 0, message: 'OK' })
            } else {
                resolve({ errCode: 1, message: 'Missing payload...' })
            }
        } catch (error) {
            reject('error from server: ', error)
        }
    })
}
let today = (fromToday) => {
    let requiredDay = fromToday || 0
    let date = new Date()
    let day = date.getDay() + requiredDay
    let dayWord = ''
    switch (day % 7) {
        case 0:
            dayWord = 'Chủ Nhật'
            break
        case 1:
            dayWord = 'Thứ 2'
            break
        case 2:
            dayWord = 'Thứ 3'
            break
        case 3:
            dayWord = 'Thứ 4'
            break
        case 4:
            dayWord = 'Thứ 5'
            break
        case 5:
            dayWord = 'Thứ 6'
            break
        case 6:
            dayWord = 'Thứ 7'
            break
        default:
            break
    }
    dayWord = !fromToday || fromToday === 0 ? 'Hôm nay' : dayWord
    let newDate = `${date.getDate() + requiredDay}/${date.getMonth() + 1}/${date.getFullYear()}`
    let newFullDate = `${dayWord} - ${date.getDate() + requiredDay}/${date.getMonth() + 1}/${date.getFullYear()}`
    return { newDate, newFullDate }

}
let getDoctorByIdSpecialtyService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let type = query.type === 'specialty' ? 'specialtyId' : 'clinicId'
            let response = await db.Info_Doctor.findAll({
                where: { [type]: +query.id },
                include: [
                    { model: db.User, attributes: { exclude: ['password'] } },
                    { model: db.Allcode, as: 'price' },
                    { model: db.Allcode, as: 'province' },
                    { model: db.Allcode, as: 'payment' },
                ],
                raw: true,
                nest: true
            })
            if (_.isEmpty(response)) {
                resolve({
                    errCode: 2,
                    message: `Specialty ID: ${query.id} is empty!`
                })
            } else {
                let responseUser = []
                for (let i = 0; i < response.length; i++) {
                    let result = await db.User.findOne({
                        where: { id: response[i].doctorId },
                        attributes: ['positionId', 'id'],
                        include: [
                            { model: db.Allcode, as: 'positionData', attributes: ['valueVI'] },
                            { model: db.Markdown, attributes: ['introduction'] },

                        ],
                        raw: true,
                        nest: true
                    })
                    let resultFromSchedule = await db.Schedule.findAll({
                        where: { doctorId: response[i].doctorId, date: query.date },
                        attributes: ['timeType', 'date', 'doctorId'],
                        include: [
                            { model: db.Allcode, attributes: ['valueVI', 'id'] }
                        ],
                        raw: true,
                        nest: true
                    })
                    responseUser.push({ ...result, timeSchedule: resultFromSchedule, ...response[i], currentDay: today().newDate })
                }

                resolve({
                    errCode: 0,
                    response: responseUser,
                    message: 'OK'
                })
            }
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let getBookingByDoctorIdService = async (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Booking.findAll({
                where: { doctorId: query.id, date: query.date },
                include: [
                    { model: db.User, attributes: { exclude: ['password', 'image'] } },
                    { model: db.Allcode, as: 'status', attributes: ['valueVI'] },
                ],
                raw: true,
                nest: true
            })
            if (_.isEmpty(response) || !response) {
                resolve({
                    errCode: 2,
                    message: `Schedule of id: ${doctorId} and date: ${date} is not exist!`
                })
            } else {
                // console.log(response);
                resolve({
                    errCode: 0,
                    response: response,
                    message: 'OK'
                })
            }
            // resolve(response)dasdsd
        } catch (error) {
            reject(error)
        }
    }
    )
}
let updateStatusAndSendRemadyService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Booking.findOne({
                where: { token: body.token },
            })
            if (_.isEmpty(response)) {
                resolve({
                    errCode: 2,
                    message: `Schedule of id not exist`
                })
            } else {
                // console.log(response);đ      
                await db.Booking.update({
                    statusId: 'S3'
                }, {
                    where: { token: body.token }
                })
                await db.History.findOrCreate({
                    where: { token: body.token },
                    defaults: {
                        doctorId: body.doctorId,
                        patientId: body.patientId,
                        token: body.token,
                        emailPatient: body.email,
                        files: body.imgbase64,
                        timeType: body.timeType,
                        date: body.date
                    }
                })
                await emailService.sendRemedy(body)
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
            // resolve(response)dasdsd
        } catch (error) {
            reject(error)
        }

    })
}
let deleteCompletedBookingService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Booking.findOne({
                where: { token: token },
            })
            if (_.isEmpty(response) || !response) {
                resolve({
                    errCode: 2,
                    message: `Schedule of id not exist`
                })
            } else {
                // console.log(response);
                await db.Booking.destroy({
                    where: { token: token }
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
            // resolve(response)dasdsd
        } catch (error) {
            reject(error)
        }

    })
}

module.exports = {
    getOutstandingDoctorService, createInforDoctorService, getDetailInforDoctorByIdService, getInforDoctorByIdService, updateInforDoctorByIdService,
    bulkCreateScheduleService, getDoctorScheduleService, upsertDoctorInforService, getDoctorByIdSpecialtyService, getBookingByDoctorIdService,
    updateStatusAndSendRemadyService, deleteCompletedBookingService
}