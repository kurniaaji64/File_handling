const jwt         = require('jsonwebtoken')
const response    = require(appRoot+'/Utils/response.js'); 
exports.cekToken = async (req, res, next) =>{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      console.log(authHeader)
      if (token == null) return response.error(400,'maaf, silahkan login terlebih dahulu.',res)
     
      try {
            if (token) {
                  // verifies secret and checks exp
                  jwt.verify(token, "abcd123", function(err, decoded) {
                        if(err){
                              if(err.name=='TokenExpiredError'){
                                    response.error(401,'maaf, session anda telah telah habis, silahkan login kembali',res)
                              }else{
                                    response.error(401,'Unauthorized Access',res)
                              }
                        }
                    req.decoded = decoded;
                    console.log(decoded)
                  });
                } else {
                  // if there is no token
                  // return an error
                  response.error(401,'maaf, session anda telah telah habis, silahkan login kembali',res)
                }
                next()
      } catch (error) {
            console.log(error)
            response.error(500,'Internal Server Error',res)
      }
}