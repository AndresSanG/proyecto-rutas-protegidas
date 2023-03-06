const checkUserCredentials = require('./auth.controllers')
const responses = require('../utils/responses.handler')
const jwt = require('jsonwebtoken')

const postLogin = (req,res) =>{
    const {email,password} = req.body
    checkUserCredentials(email,password)
    .then((user)=>{
        if(user){
            const token = jwt.sign({
                id:user.id,
                firstName:user.firstName,
                email:user.email
            },'academlo') 
            responses.success({
                res,
                status:200,
                message:'Correct Credencials',
                data: token
            })
        }else{
            responses.error({
                res,
                status:401,
                message:'invalid credentials'
            })
        }
    })
    .catch(err=>{
        responses.error({
            res,
            status:400,
            data:err,
            message:'auth credentials valid bad'
        })
    })
}
module.exports= postLogin