
import _ from 'lodash'
import userServices from '../services/userServices'

let homePage = (req, res) => {
    // console.log(users);
    return res.status(200).json('hello')
}


let getUsersApi = async (req, res) => {

    if (req.query) {
        let allUsers = await userServices.handleGetUSersApi(req.query)
        return res.status(200).json(allUsers)
    } else {
        return res.status(500).json({ errCode: 1, message: ' Missing payload!' })
    }

}
let createUsersApi = async (req, res) => {
    if (req.body) {
        let result = await userServices.handleCreatUserApi(req.body)
        return res.status(200).json(result)
    } else {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing payload'
        })
    }
}
let updateUsersApi = async (req, res) => {
    if (req.body && req.body.email) {
        let result = await userServices.handleUpdateUserApi(req.body)
        return res.status(200).json(result)
    } else {
        return res.status(500).json({ errCode: 1, message: 'Missing payload' })
    }
}
let deleteUserApi = async (req, res) => {
    // console.log(req.query);
    if (req.query) {
        let result = await userServices.handleDeleteUserApi(req.query)
        return res.status(200).json(result)
    } else {
        return res.status(500).json({ errCode: 2, message: 'Cannot get user' })

    }
}
let login = async (req, res) => {
    try {
        // console.log(req.body);
        let infoUser = req.body
        let result
        if (infoUser && infoUser.email && infoUser.password) {
            result = await userServices.handleLogin(infoUser)

        } else {
            result = {
                errCode: 1,
                message: 'Missing payload'
            }
        }
        return res.status(200).json(result)



    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }

}
let getAllcode = async (req, res) => {
    try {
        if (req.query) {
            let result = await userServices.handleGetAllcode(req.query)
            if (!result) {
                return res.status(200).json({ errCode: 2, message: 'Fail load data from DB' })
            } else {
                return res.status(200).json(result)
            }
        } else {
            return res.status(200).json({ errCode: 1, message: 'Missing payload' })
        }

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }
}
let createSpecialty = async (req, res) => {
    try {
        if (_.isEmpty(req.body)) {
            return res.status(200).json({ errCode: 1, message: 'Missing payload' })
        } else {
            let result = await userServices.createSpecialtyService(req.body)
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
let readSpecialty = async (req, res) => {
    try {
        let result = await userServices.readSpecialtyService()
        if (!result) {
            return res.status(200).json({ errCode: 2, message: 'Fail load data from DB' })
        } else {
            return res.status(200).json(result)
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }
}
let createClinic = async (req, res) => {
    try {
        if (_.isEmpty(req.body)) {
            return res.status(200).json({ errCode: 1, message: 'Missing payload' })
        } else {
            let result = await userServices.createClinicService(req.body)
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
let readClinic = async (req, res) => {
    try {
        // console.log(req.query);
        if (req.query && req.query.id) {
            let result = await userServices.readClinicService(req.query.id)
            if (!result) {
                return res.status(200).json({ errCode: 2, message: 'Fail load data from DB' })
            } else {
                return res.status(200).json(result)
            }
        } else {
            return res.status(200).json({ errCode: 2, message: 'Missing...' })
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }
}
let createHandbook = async (req, res) => {
    try {
        // console.log(req.query);
        if (req.body) {
            let result = await userServices.createHandbookService(req.body)
            if (!result) {
                return res.status(200).json({ errCode: 2, message: 'Fail load data from DB' })
            } else {
                return res.status(200).json(result)
            }
        } else {
            return res.status(200).json({ errCode: 2, message: 'Missing...' })
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }
}
let readHandbook = async (req, res) => {
    try {
        if (req.query && req.query.id) {
            let result = await userServices.readHandbookService(req.query.id)
            if (!result) {
                return res.status(200).json({ errCode: 2, message: 'Fail load data from DB' })
            } else {
                return res.status(200).json(result)
            }
        } else {
            return res.status(200).json({ errCode: 2, message: 'Missing id' })
        }


    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Fail form server: ' + error
        })
    }
}

module.exports = {
    homePage, createUsersApi, getUsersApi, updateUsersApi, deleteUserApi, login, getAllcode, createSpecialty, readSpecialty,
    createClinic, readClinic, createHandbook, readHandbook
}  