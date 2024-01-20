import taskModels from "../models/task.models"

export const addTask =async (req,res)=>{
    try {
        
        const {userID,title,description} = req.body             

            const  tasklist= new taskModels({
                userID:userID,
                title:title,
                description:description,
            })

            tasklist.save()

            if(tasklist){
                return res.status(200).json({
                    message:"Task added Successfully "
                })
            }
        

        


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getTasks = async(req,res)=>{     // to get all task 
    try{

        const {userID} = req.body


        const taskdata = await taskModels.find({userID:userID, status:1})

        if(taskdata){
            return res.status(200).json({
                data:taskdata,
                total:taskdata.length,
                message:'successfully featch',

            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getTask = async(req,res)=>{
    try {

            const taskid =req.params.taskID
    

           
            const taskdata =await taskModels.findOne({_id:taskid})
    
            
            if(taskdata){
                return res.status(200).json({
                    data:taskdata,
                    message:'successfully fetch'
                })
            }
        
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const updateTask = async(req,res)=>{
    try {

            const taskid =req.params.taskID
    
            const {title,description} = req.body

           
            const updated =await taskModels.updateOne({_id:taskid},{$set:{
                title:title,
                description:description
            }})
    
            
            if(updated.acknowledged){
                return res.status(200).json({
                    message:'Updated'
                })
            }
        
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const deleteTask =async (req,res) =>{   // to soft delete (task not delete in database)

    try {
        
        const taskid =req.params.taskID


        const deleteTask =await taskModels.updateOne({_id:taskid},{$set:{
            status:0
        }})

        if(deleteTask.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } 
    catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}

export const removeTask =async (req,res) =>{   // to hard delete (to permanent delete from database)

    try {
        
        const taskid =req.params.taskID


       

        const removeTask=await taskModels.deleteOne({_id:taskid})

        if(removeTask.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}
