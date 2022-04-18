
import db from '../models'
import bcrypt from 'bcryptjs'
import _ from 'lodash'


let salt = bcrypt.genSaltSync(8)


let hashPassword = async (pass) => {
    let hashedPass = await bcrypt.hashSync(pass, salt)
    return hashedPass
}
let handleUpdateUserApi = (bodyReq) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (bodyReq.email) {
                let user = await db.User.findOne({
                    where: { email: bodyReq.email },
                    attributes: {
                        exclude: ['password']
                    }
                })
                if (user) {
                    await db.User.update({
                        firstName: bodyReq.firstName,
                        lastName: bodyReq.lastName,
                        phoneNumber: bodyReq.phoneNumber,
                        roleId: bodyReq.roleId,
                        gender: bodyReq.gender,
                        address: bodyReq.address,
                        positionId: bodyReq.positionId,
                        image: bodyReq.image || ''
                    }, {
                        where: { email: bodyReq.email }
                    })
                    resolve({ errCode: 0, message: 'OK' })
                } else {
                    resolve({ errCode: 2, message: ' Cannot get user' })
                }
            } else {
                resolve({ errCode: 1, message: 'Missing payload' })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleGetUSersApi = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (query.email) {
                let users = ''
                if (query.email === 'ALL') {
                    users = await db.User.findAll({
                        attributes: {
                            exclude: ['password']
                        }
                    })
                }
                if (query.email !== 'ALL') {

                    users = await db.User.findOne({
                        where: { email: query.email },
                        attributes: {
                            exclude: ['password']
                        }
                    })
                    users = users ? users : ''
                }
                users && users !== '' ? resolve({ errCode: 0, user: users, message: 'OK' }) : resolve({ errCode: 2, message: 'Cannot get user' })
            } else {
                resolve({ errCode: 1, message: 'Missing payload' })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleCreatUserApi = (bodyReq) => {
    // console.log(bodyReq);
    return new Promise(async (resolve, reject) => {
        try {
            if (bodyReq && bodyReq.email && bodyReq.password) {
                let user = await db.User.findOne({
                    where: { email: bodyReq.email },
                    attributes: {
                        exclude: ['password']
                    }
                })
                if (user) {
                    resolve({ errCode: 3, message: 'Email has existed' })
                } else {
                    let hashedPass = await hashPassword(bodyReq.password)
                    await db.User.create({
                        email: bodyReq.email,
                        password: hashedPass,
                        firstName: bodyReq.firstName,
                        lastName: bodyReq.lastName,
                        address: bodyReq.address,
                        gender: bodyReq.gender,
                        roleId: bodyReq.roleId,
                        phoneNumber: bodyReq.phoneNumber,
                        positionId: bodyReq.positionId,
                        image: bodyReq.image
                    })
                    resolve({ errCode: 0, message: 'OK' })
                }
            } else {
                resolve({ errCode: 4, message: 'Missing compulsory fields!' })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let handleDeleteUserApi = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (query.email) {
                let foundUser = await db.User.findOne({ where: { email: query.email } })
                if (foundUser) {
                    await db.User.destroy({
                        where: { email: query.email }
                    })
                    resolve({ errCode: 0, message: ' OK' })
                } else {
                    resolve({ errCode: 5, message: 'User hasnt existed' })
                }
            } else {
                resolve({ errCode: 1, message: 'Missing paypload' })
            }

            // }
        } catch (error) {
            reject(error)
        }
    })
}

let handleLogin = (infoUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: { email: infoUser.email },
            })
            // console.log(users);
            if (users) {
                let check = bcrypt.compareSync(infoUser.password, users.password)
                delete users.password
                check ? resolve({ errCode: 0, user: users, message: 'OK' }) : resolve({ errCode: 6, message: 'Password was wrong!' })
            } else {
                resolve({ errCode: 5, message: 'User hasnot existed' })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let handleGetAllcode = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (query.type) {
                let response = await db.Allcode.findAll({
                    where: { type: query.type }
                })
                response ? resolve({ errCode: 0, typeCode: response, message: 'OK' }) : resolve({ errCode: 2, message: 'Fail load data from DB' })
            } else {

                resolve({
                    errCode: 1, message: 'Params not right'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
let createSpecialtyService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (body.nameSpecialty) {
                let resultCreated = await db.Spec.findOrCreate({
                    where: { name: body.nameSpecialty },
                    defaults: {
                        name: body.nameSpecialty,
                        image: body.image,
                        descriptionHTML: body.descriptionHTML,
                        descriptionMarkdown: body.descriptionMarkdown
                    }
                })
                // console.log(response);
                resultCreated ? resolve({ errCode: 0, response: resultCreated, message: 'OK' }) : resolve({ errCode: 2, message: 'Fail load data from DB' })
            } else {

                resolve({
                    errCode: 1, message: 'Params not right'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let readSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await db.Spec.findAll()
            if (_.isEmpty(result)) {
                resolve({
                    errCode: 2,
                    message: 'Cannot get data from DB..'
                })
            } else {
                resolve({
                    errCode: 0,
                    responseData: result,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let createClinicService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (body.nameClinic) {
                let resultCreated = await db.Clinic.findOrCreate({
                    where: { name: body.nameClinic },
                    defaults: {
                        name: body.nameClinic,
                        image: body.image,
                        address: body.address,
                        descriptionHTML: body.descriptionHTML,
                        descriptionMarkdown: body.descriptionMarkdown
                    }
                })
                // console.log(response);
                resultCreated ? resolve({ errCode: 0, response: resultCreated, message: 'OK' }) : resolve({ errCode: 2, message: 'Fail load data from DB' })
            } else {

                resolve({
                    errCode: 1, message: 'Params not right'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let readClinicService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result
            if (id === 'ALL') {
                result = await db.Clinic.findAll()
            } else {
                result = await db.Clinic.findOne({
                    where: { id: id }
                })
            }
            if (_.isEmpty(result)) {
                resolve({
                    errCode: 2,
                    message: 'Cannot get data from DB..'
                })
            } else {
                resolve({
                    errCode: 0,
                    responseData: result,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let createHandbookService = (body) => {
    // console.log(body);
    return new Promise(async (resolve, reject) => {
        try {
            let result = await db.Handbook.findOrCreate({
                where: { postId: body.postId },
                defaults: {
                    title: body.title,
                    descriptionHTML: body.descriptionHTML,
                    descriptionMarkdown: body.descriptionMarkdown,
                    image: body.image,
                    author: body.author,
                    createdDay: body.createdAt,
                    updatedDay: body.updatedAt,
                    postId: body.postId
                }
            })
            // console.log(response);
            result ? resolve({ errCode: 0, response: result, message: 'OK' }) : resolve({ errCode: 2, response: [], message: 'error' })
        } catch (error) {
            reject(error)
        }
    })
}
let readHandbookService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result
            if (id === 'ALL') {
                result = await db.Handbook.findAll()
            } else {
                result = await db.Handbook.findOne({
                    where: { id: id }
                })
            }
            // console.log(result);
            result ? resolve({ errCode: 0, response: result, message: 'OK' }) : resolve({ errCode: 2, response: [], message: 'error' })
        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    handleCreatUserApi, handleUpdateUserApi, handleGetUSersApi, handleDeleteUserApi, handleLogin, handleGetAllcode,
    createSpecialtyService, readSpecialtyService, createClinicService, readClinicService, createHandbookService, readHandbookService
}