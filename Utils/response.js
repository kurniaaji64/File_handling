exports.oke=(param,res)=>{
      console.log(param)
      console.log("sukkses")
      var result ={
            code :'200',
            message:'Success',
            data:param
      }
      res.json(result); 
}

exports.error=(code,message,res)=>{
      console.log("sukkses")
      var result ={
            code :code,
            message:message,

      }
      res.status(500).json(result);      
}