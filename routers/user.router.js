import express from "express";
import {deleteuser, getuser, getusers, login, removeuser, signUp, updateUser } from "../controllers/user.controller";

const router  = express.Router()

router.post('/signup',signUp)

router.post('/login',login)

router.get('/getusers',getusers)

router.get('/getuser/:userID',getuser)

// router.put('/updateuser/:userID',updateUser)

// router.delete('/deleteuser/:userID',deleteuser)

// router.delete('/removeuser/:userID',removeuser)


export default router