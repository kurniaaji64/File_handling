var express             = require("express");
var app                 = express();
global.appRoot          =  require('app-root-path');
global.response         =  require(appRoot + '/Utils/Response.js');
var cors                = require("cors");
const bodyParser        = require('body-parser');
var moment              = require('moment')
var multer              = require('multer')
let path          = require('path')
const fs = require("fs");

app.use(cors());
// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

app.use(bodyParser.json({
    limit: "8mb",
}));
require('dotenv').config()


const port= 4000;
app.listen(port,()=>{
      console.log("SERVER RUNNING OnN PORT : 3000")
})

global.__basedir = __dirname;

let storageImages = multer.diskStorage({
      destination: (req, file, cb) => {
        if( fs.existsSync(__basedir+"/uploads/files")==false){
            fs.mkdirSync( __dirname + '/uploads/files', err => {})
     }
        cb(null,  __basedir+"/uploads/files");
      },
      filename: (req, file, cb) => {
        cb(null, "Picture-"+moment().format("YYYYMMDDHms")+path.extname(file.originalname));
      },
    });
    
    
    // picture i.e. 1 MB. it is optional
    const maxSize = 2 * 1000 * 1000;
    
    
    let uploadFile = multer({
      storage: storageImages,
      limits: { fileSize: maxSize }
        
    });


var File = require(appRoot + '/Controllers/FileController.js');
var Auth = require(appRoot + '/Controllers/AuthController.js');
var User = require(appRoot + '/Controllers/UserController.js');

var mAuth= require(appRoot + '/middleware/mAuth.js');
var mUser= require(appRoot + '/middleware/mUser.js');
var mFile= require(appRoot + '/middleware/mFile.js');
//controller
app.route('/login').post(Auth.login)

app.route('/file').get(File.listFile)
app.route('/file/images').get(mAuth.cekToken,uploadFile.single('images'),mFile.handling,File.file)
app.route('/file/images/:type/:name').get(File.getImages)
app.route('/file/document').get(mAuth.cekToken,File.file)

app.route('/users').get(mAuth.cekToken,User.list)
app.route('/users/:id').get(User.list)
app.route('/users').post(mAuth.cekToken,mUser.createUser,User.create)
app.route('/users/:id').put(mAuth.cekToken,mUser.UpdateUser,User.update)
app.route('/users/:id').delete(mAuth.cekToken,User.delete)