
var response= require(appRoot + '/Utils/Response.js');
const knex      = require(appRoot+'/config/database.js');
let decode =      require('jwt-decode')
var base_url = process.env.base_url

var fs=require('fs')
exports.file=async function(req,res){
      console.log(req.file)
      console.log(req.body)
      await knex('file_handling').insert({
            'name':req.file.filename,
            'type':req.body.type
      })

     
      response.oke("Upload File Images Successfully",res)
}

exports.listFile=async function(req,res){
      try {
          
            let file= await knex('file_handling')
            for (const i in file) {
                  file[i].base_url= base_url+"/"+file[i].type+"/"+file[i].name
            }
            response.oke(file,res)
      } catch (error) {
            console.log(error)
            response.error(500,"Load Images Failde",res)
      }
}
exports.getImages=async function(req,res){
      try {
            console.log(req.params)
            let fileName=req.params.name;
            var directoryPath = __basedir+"/uploads/picture/";
            if(req.params.type=="image"){
                  fs.readFile(__basedir+"/uploads/picture/"+req.params.name, function (err, data) {
                        if (err) {
                             return response.error(500,"Load Images Failde",res) 
                        } ;
                        res.write(data);
                      }); 
            }else{
                  res.download(directoryPath + fileName, fileName, (err) => {
                        if (err) {
                          console.log(err)
                          res.status(500).send({
                              status:500,
                              message: "Could not download the file : File Doesn't Exist !! " ,
                          });
                  
                        }
                      });
            }
                
      } catch (error) {
            console.log(error)
            response.error(500,"Load Images Failde",res)
      }
}