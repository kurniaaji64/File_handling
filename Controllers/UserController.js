const knex      = require(appRoot+'/config/database.js'); 
var bcrypt = require('bcryptjs');
const response    = require(appRoot+'/Utils/response.js'); 
const email    = require(appRoot+'/Utils/sendEmail.js');
let request= require('request')

exports.create=async (req,res)=>{
      try {

            var secretKey=process.env.secretKey;
            var chapta=req.body.rechaptha;
            const url =`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${chapta}&remoteip=${req.connection.remoteAddress}`;
      
            request(url,async function(error,response,body) {
              body = JSON.parse(body);
              console.log(body)
      
              if(body.success !== undefined && body.success==false) {
                return res.json({"status" : "400" ,"message":"Verification Chaptha is Failed"});
              }

              let user = await knex('users')
                                .insert({
                                      'name':req.body.name,
                                      'username':req.body.username,
                                      'password':bcrypt.hashSync(req.body.password),
                                      'email':req.body.email,
                                      'phone':req.body.phone,
                                      'role_id':2,
  
                                })
  
              response.oke("Create New Users Success",res)
            })
           
      } catch (error) {
            console.log(error)
            response.error(500,"Create New Users Failed",res)
      }
}

exports.list=async (req,res)=>{
      try {
            let cekUsers= await knex('users').select('users.id','users.name','users.username','users.email','users.phone','roles.name as role_name')
                              .join('roles','roles.id','users.role_id').where('deleted','!=',1)
            response.oke(cekUsers,res)
      } catch (error) {
            console.log(error)
            response.error(500,"Load Users Failed",res)
      }
}
exports.update=async (req,res)=>{
      try {
            let user = await knex('users')
                              .update({
                                    'name':req.body.name,
                                    'username':req.body.username,
                                    'password':req.body.password,
                                    'email':req.body.email,
                                    'phone':req.body.phone

                              }).where('id',req.params.id)
                              console.log(user)
            response.oke("Update Users Success",res)
      } catch (error) {
            console.log(error)
            response.error(500,"Update New Users Failed",res)
      }
}
exports.delete=async (req,res)=>{
      try {
            let user = await knex('users')
            .update({
                  'deleted    ':1

            }).where('id',req.params.id)

      response.oke("Delete Users Success",res)
      } catch (error) {
            console.log(error)
            response.error(500,"Update New Users Failed",res) 
      }
}

exports.sendEmail= async (req,res)=>{
      try {
          var pram= {
              name:req.body.name,
              email:req.body.email,
              username:req.body.username,
              password: req.body.password,
              
          }
          email.send(req,res,pram).then(()=>{
             
              return response.oke('Send Email Succes',res)
          }).catch(()=>{
              return response.error(500,"Send Email Failed",res);
          })
      } catch (error) {
          console.log(error)
          response.error(500,"Send Email Failed",res);
      }
  }