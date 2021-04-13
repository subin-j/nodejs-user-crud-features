const { AUTH_TOKEN_SALT } = process.env
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Controller 는 오직 Service 레이어에만 의존합니다.
const { UserService } = require('../services') 
// 자주 사용되는 로직은 utils 로 빼서 모듈로 관리합니다.
const { errorGenerator } = require('../utils')