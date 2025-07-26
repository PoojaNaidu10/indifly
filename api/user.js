var express = require('express'),
    router = express.Router(),
    User = require("../models/user"),
    apiResponse = require("../utils/apiResponse"),
    apiError = require("../utils/apiErrors"),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId

const addUser = async function (req, res) {
    try {
        let user = new User(req.body)
        let mobileNo = req.body.mobile_no

        if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobileNo))) {
            res.status(400).send({ status: false, msg: "Mobile no is not valid" })
            return
        }

        let emailId = req.body.email_id

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {
            res.status(400).send({ status: false, msg: "Email id is not valid" })
            return
        }
        await user.save()
        return apiResponse.sendResponse({ message: "User added successfully" }, 200, res)
    } catch (err) {
        console.log("------err----", err)
        return apiResponse.sendError(apiError.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

const getUserList = async function (req, res) {
    try {
        let userObjectList = await User.find({})
        return apiResponse.sendResponse(userObjectList, 200, res)
    } catch (err) {
        console.log("-----err-------", err)
        return apiResponse.sendError(apiError.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

const updateUser = async function (req, res) {
    try {
        let userId = req.body.user_id
        let mobileNo = req.body.mobile_no

        if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobileNo))) {
            res.status(400).send({ status: false, msg: "Mobile no is not valid" })
            return
        }

        let emailId = req.body.email_id

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {
            res.status(400).send({ status: false, msg: "Email id is not valid" })
            return
        }

        let userUpdateObject = await User.updateOne({ "_id":new ObjectId(userId) }, { $set: req.body })
        return apiResponse.sendResponse({ message: "User updated successfully" }, 200, res)
    } catch (err) {
        console.log("-----err-------", err)
        return apiResponse.sendError(apiError.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}


const deleteUserById = async function (req, res) {
    try {
        let userId = req.query.user_id

        let userDeletedObject = await User.deleteOne({ "_id": new ObjectId(userId) })
        return apiResponse.sendResponse({ message: "User deleted sucessfully" }, 200, res)
    } catch (err) {
        console.log("-----err-------", err)
        return apiResponse.sendError(apiError.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}


router.post('/user/addUser', addUser)
router.get('/user/getUserList', getUserList)
router.put('/user/updateUser', updateUser)
router.delete('/user/deleteUserById', deleteUserById)

module.exports = router