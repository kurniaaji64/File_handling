const { check, body , query ,oneOf, validationResult } = require('express-validator');
const knex      = require(appRoot+'/config/database.js'); 
let path          = require('path')
const fs = require("fs");
exports.handling= (req,res,next)=>{
      try {

            var filetypes = /jpeg|jpg|png/;
            var nameFile=req.file.filename;
             // picture i.e. 1 MB. it is optional
            const maxSize = 5 * 1024 * 1024;
              if (path.extname(nameFile)!='.png'&&path.extname(nameFile)!='.jpg'&&path.extname(nameFile)!='.jpeg'){
                  // delete Images ALL
                 
                    fs.unlink('./images/'+nameFile, function (err) {
                      if (err) {
                          console.error(err);
                      }
                        console.log('File has been Deleted');
                      });
                  
                  response.error(402,"File upload only supports the "
                  + "following filetypes - " + filetypes,res)
              
              }else if(req.file.size >= maxSize){
                  // delete Images ALL
                    fs.unlink('./images/'+nameFile, function (err) {
                      if (err) {
                          console.error(err);
                      }
                        console.log('File has been Deleted');
                      });
                  response.error(402,"File too large max size : 800KB",res)
              }
              next()
      } catch (error) {
            console.log(error)
            response.error(500,"Internal Server Error",res)
      }
}