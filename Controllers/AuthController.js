const knex        = require(appRoot+'/config/database.js');
const response    = require(appRoot+'/Utils/response.js'); 
var bcrypt        = require('bcryptjs');
const jwt         = require('jsonwebtoken')

exports.login=async (req,res)=>{
      try {

            let cekUsers= await knex('users')
            .where('username',req.body.username)
            .first()
            console.log(cekUsers)
            if (!cekUsers) {
                  response.error(400, "akun anda tidak terdaftar", res)
            }else{
                  
                  if(bcrypt.compareSync(req.body.password, cekUsers.password) == true){
                        try {
                              const token = jwt.sign({ username: cekUsers['username'],user_id: cekUsers['id'] ,role_id: cekUsers['role_id'] }, "abcd123",{expiresIn: '11h'})
                              
                              var result={
                                    'name':cekUsers.name,
                                    'username':cekUsers.username,
                                    "token":token
                              }
                              response.oke(result,res)
                        } catch (error) {
                              console.log(error)
                        }
                        
                  }else{
                        response.error(400, "Username/Password Salah", res)
                  }
            }


          
      } catch (error) {
            
      }
}
