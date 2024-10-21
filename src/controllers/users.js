import UserModel from "../models/UserModel.js"
import Auth from '../common/Auth.js'

const getAllUsers = async(req,res)=>{
    try {
        let users = await UserModel.find({role:"admin"},{password:0})
        res.status(200).send({
            message:"Data Fetch Successful",
            users
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const create = async (req,res)=>{
    try {
        let {name,email,password} = req.body
        let user = await UserModel.findOne({email:req.body.email})
        
        if(!user){
            password = await Auth.hashPassword(password)
            await UserModel.create({name,email,password})
            res.status(200).send({
                message:"User Created successfully"
            })
        }
        else{
            res.status(400).send({
                message:`User with ${req.body.email} already exits`
            })
        }
    } 
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal server Error"
        })
    }
}

const deleteUser = async(req,res)=>{
  try {
    let userId = req.params.id;
    let user = await UserModel.findById(userId);
    if(user){
        await UserModel.deleteOne({_id:userId});
        res.status(200).send({
            message:"User Deleted Successfully"
        })
    }
    else{
        res.status(400).send({
            message:"invalid User"
        })
    }

  } catch (error) {
    res.status(500).send({
        message:error.message || "Internal server Error"
    })
  }
}

const login = async(req,res)=>{
    let {email,password} = req.body;
    try {
        let user = await UserModel.findOne({email:email})
        if(user){
            if(await Auth.hashCompare(password,user.password)){
                let token = await Auth.createtoken({
                    email,
                    role:user.role,
                    id:user._id
                })
                res.status(200).send({
                    message:"login Successful",
                    name:user.name,
                    role:user.role,
                    token

                })
            }
            else{
                res.status(400).send({
                    message:"Incorrect password"
                })
            }

        }
        else{
            res.status(400).send({
                message:"User doesn't exixts"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Interal Server Error"
        })
    }
}

export default {
    create,
    getAllUsers,
    deleteUser,
    login
}