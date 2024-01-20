import express from "express";
import { addTask, deleteTask, getTask, getTasks, removeTask, updateTask } from "../controllers/task.controller";

const router  = express.Router()

router.post('/addtask',addTask)

router.post('/gettasks',getTasks)

router.get('/gettask/:taskID',getTask)

router.put('/updatetask/:taskID',updateTask)

router.delete('/deletetask/:taskID',deleteTask)  // to soft delete

router.delete('/removetask/:taskID',removeTask)  //to permanent delete




export default router