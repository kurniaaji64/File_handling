const { check, body , query ,oneOf, validationResult } = require('express-validator');
const knex      = require(appRoot+'/config/database.js'); 
exports.createUser= [
      check('name').isString().isLength({min:1}).withMessage("Name Tidak boleh kosong"),
      check('username').isString().isLength({min:1}).withMessage("Username Tidak boleh kosong"),
      check('password', 'Password length min 8 characters max 15 characters').isLength({ 
            min: 8, max:15 
        }).isString(),
      check('email').isEmail().isLength({min:1}).withMessage("Email boleh kosong")
      .custom(async (email, { req }) => {
            let dt= await knex('users').select('email').where('email',req.body.email).first()

            if( dt!=undefined ){
                  throw new Error('Oops ..maaf, Email :" '+email+' "sudah digunakan!!');
            }
                
            
          }),
      check('phone').isMobilePhone().isLength({min:1}).withMessage("No Hp Tidak boleh kosong")
      .custom(async (phone, { req }) => {
            let dt= await knex('users').select('username').where('username',req.body.username).first()

            if( dt!=undefined ){
                  throw new Error('Oops ..maaf, No Hp :" '+phone+' " sudah digunakan!!');
            }
              
          }),
      function(req,res,next) {
            var errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                  return response.error(402,errorValidation.errors,res)
            }
            next()
      }
]

exports.UpdateUser= [
      check('name').isString().isLength({min:1}).withMessage("Name Tidak boleh kosong"),
      check('username').isString().isLength({min:1}).withMessage("Username Tidak boleh kosong"),
      check('email')
      .custom(async (email, { req }) => {
            let dt= await knex('users').select('email').where('email',req.body.email).whereNot('id',req.params.id).first()

            if( dt!=undefined ){
                  throw new Error('Oops ..maaf, Email :" '+email+' "sudah digunakan!!');
            }
                
            
          }),
      check('phone').isNumeric().isLength({min:10}).withMessage("No Hp Min 10 Karakter")
      .custom(async (phone, { req }) => {
            let dt= await knex('users').select('phone').where('phone',req.body.phone).whereNot('id',req.params.id).first()

            if( dt!=undefined ){
                  throw new Error('Oops ..maaf, No Hp :" '+phone+' " sudah digunakan!!');
            }
              
          }),
      function(req,res,next) {
            var errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                  return response.error(402,errorValidation.errors,res)
            }
            next()
      }
]