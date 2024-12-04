const express = require('express')

const router = express.Router()

const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')


// register
router.post('/register',userController.register)

// login
router.post('/login',userController.login)

// add Project
router.post('/addproject',jwtMiddleware,multerConfig.single('projectImage'), projectController.addProject)

// get home project
router.get('/homeproject',projectController.getHomeProjects)

// get User Project
router.get("/userprojects",jwtMiddleware,projectController.getUserProjects)

// get All Projects
router.get("/allprojects",jwtMiddleware,projectController.getAllProjects)

// edit user project
router.put('/projects/edit/:pid',jwtMiddleware,multerConfig.single('projectImage'), projectController.editUserProject)

// delete user project
router.delete('/projects/delete/:pid',jwtMiddleware, projectController.deleteUserProject)

// update profile
router.put('/updateprofile',jwtMiddleware,multerConfig.single('profileImage'), userController.updateProfile)

// get profile
router.get('/getprofile',jwtMiddleware,userController.getProfile)


module.exports = router