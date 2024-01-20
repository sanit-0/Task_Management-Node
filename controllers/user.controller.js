import bcrypt from 'bcrypt'
import userModel from "../models/user.model"
import jwt from 'jsonwebtoken'





export const signUp = async(req,res)=>{
    try{
        const {username,email,password} = req.body

        const existuser = await userModel.findOne({email:email});

        if(existuser){
            return res.status(200).json({
                message:'user already exist.'
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);


        const SaveUser = new userModel({
            username:username,
            email:email,
            password:hashedPassword,
            
        })

        SaveUser.save()

        if(SaveUser){
            return res.status(200).json({
                message:'Successfully signup'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const login = async(req,res)=>{
    try{
        const {username,email,password} = req.body


        const checkuser ={
            $or:[
                {username:username},
                {email:email}
            ]
        }

        const existUser =await userModel.findOne(checkuser)

        if(!existUser){
            return res.status(400).json({
                message:"User doesn't exist"
            })
        }

        const checkPassword = bcrypt.compareSync(password,existUser.password)

        if(!checkPassword){
            return res.status(400).json({
                message:"Invalide credential"
            })
        }

        const token = jwt.sign(
            {
                id:existUser._id,
                email:existUser.email
            },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("userdata",existUser)

        return res.status(200).json({
            data:existUser,
            token:token,
            message:"Login successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getusers =async (req,res)=>{
    try {

        // const {search}=req.query
        // const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        // const searchrgx = rgx(search)

        // const filter= {status:1}

        // if(search){
        //     filter={
        //         ...filter,
        //         $or:[
        //             {usernamename:{$regex:searchrgx , $options:"i"}},
        //             {email:{$regex:searchrgx , $options:"i"}},
        //         ]
        //     }

        // }
        const getuserdata = await userModel.find({status:1})

        if(getuserdata){

            return res.status(200).json({
                data:getuserdata,
                total:getuserdata.length,
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

export const getuser = async(req,res)=>{
    try {
        const userid =req.params.userID

        const getuserdata =await userModel.findOne({_id:userid})

        if(getuserdata){
            return res.status(200).json({
                data:getuserdata,
                message:'single user data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


// export const updateUser = async(req,res)=>{
//     try {

//         const uploaduserdata =upload.single('thumbnail')

//         uploaduserdata(req,res,async function(err){
//             if(err){
//                 return res.status(400).json({
//                     message:err.message
//                 })
//             }
//             const userid =req.params.userID
    
//             const existUser= await userModel.findOne({_id:userid})

//             let img = existUser.thumbnail

//             console.log('img-',img)
//             if(req.file){
//                 img = req.file.filename
//             console.log('img-',req.file.filename)


//                 if(fs.existsSync('./uploads/'+existUser.thumbnail)){
//                     fs.unlinkSync('./uploads/'+existUser.thumbnail)
//                 }
//             }

//             const {username,email,password,fname,lname,companyname,countryname,street,town,state,zipcode,contact,bemail} = req.body

//             let hashedPassword = existUser.password; 

//             if (password) {
//                 hashedPassword = bcrypt.hashSync(password, 10);
//             }

//             const updated =await userModel.updateOne({_id:userid},{$set:{
//                 username:username,
//                 email:email,
//                 password:hashedPassword,
//                 fname:fname,
//                 lname:lname,
//                 companyname:companyname,
//                 countryname:countryname,
//                 street:street,
//                 town:town,
//                 state:state,
//                 zipcode:zipcode,
//                 contact:contact,
//                 bemail:bemail,
//                 thumbnail:img
//             }})
    
            
//             if(updated.acknowledged){
//                 return res.status(200).json({
//                     message:'Updated'
//                 })
//             }
//         })
//     } 
//     catch (error) {
//         return res.status(500).json({
//             message:error.message
//         })
//     }
// }


// export const deleteuser =async (req,res) =>{

//     try {
        
//         const userID = req.params.userID

//         const deleteuser =await userModel.updateOne({_id:userID},{$set:{
//             status:0
//         }})

//         if(deleteuser.acknowledged){
//             return res.status(200).json({
//                 message:'successfully deleted'

//             })
//         }
        
//     } 
//     catch (error) {

//         return res.status(500).json({
//             message:error.message
//         })
        
//     }

    

// }

// export const removeuser =async (req,res) =>{

//     try {
        
//         const userID = req.params.userID


//         const userdata = await userModel.findOne({_id:userID})

//         if(fs.existsSync('uploads/'+userdata.thumbnail)){
//             fs.unlinkSync('uploads/'+userdata.thumbnail)
//         }

//         const removeuser =await userModel.deleteOne({_id:userID})

//         if(removeuser.acknowledged){
//             return res.status(200).json({
//                 message:'successfully deleted'

//             })
//         }
        
//     } catch (error) {

//         return res.status(500).json({
//             message:error.message
//         })
        
//     }

    

// }

    
