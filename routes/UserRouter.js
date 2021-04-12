const express = require('express')
const router = express.Router()

const { UserController } = require('../controllers') 
// Route 는 오직 Controller 에만 의존 합니다.

// router.post('/login', UserController.logIn) // '/users/login' 핸들링 하는 컨트롤러 함수
// router.post('/signup', UserController.signUp) // '/users/signUp' 핸들링 하는 컨트롤러 함수

module.exports = router