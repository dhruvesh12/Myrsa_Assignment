var express = require('express');
var router = express.Router();
var dbConnect = require('../DbConfig/MysqlConnection')

/* GET home page. */
router.post('/employee', (req, res) =>{

  const {FirstName,LastName,Age} = req.body
  dbConnect.DB.query(`INSERT INTO Employee.employeeData (FName, LName, Age) VALUES ('${FirstName}', '${LastName}',${Age})`,(err,result)=>{
    if(err) throw err

    if(result){
      res.json({response:true,Message:"Employee Data Added"})
    }
  })
});


router.get('/employee',(req,res)=>{

  dbConnect.DB.query(`SELECT * FROM Employee.employeeData`,(err,result)=>{
    if(err) throw err

    if(result.length > 0){
      res.json({response:true,Message:"Employee Data Found", detail:result})
    }else{
      res.json({response:false,Message:"Employee Data Not Found", detail:result})
    }
  })
})


router.get('/employee/:id',(req,res)=>{

  const id = req.params.id

  dbConnect.DB.query(`SELECT * FROM Employee.employeeData WHERE id=${id}`,(err,result)=>{
    if(err) throw err

    if(result.length > 0){
      res.json({response:true,Message:"Employee Data Found", detail:result})
    }else{
      res.json({response:false,Message:"Employee Data Not Found", detail:result})
    }
  })

})

router.put('/employee/:id',(req,res)=>{

  const id = req.params.id

  const {FName,LName,Age} = req.body

  

  dbConnect.DB.query(`UPDATE Employee.employeeData SET FName = '${FName}', LName='${LName}', Age=${Age} WHERE id = ${id}`,(err,result)=>{

    console.log(result)
    if(err) throw err

    if(result){
      res.json({response:true,Message:"Employee Data Updated", detail:result})
    }else{
      res.json({response:false,Message:"Employee Data Not Updated", detail:result})
    }
  })

})


router.delete('/employee/:id',(req,res)=>{
  
  const id = req.params.id


  dbConnect.DB.query(`DELETE FROM Employee.employeeData WHERE id = ${id}`,(err,result)=>{

    console.log(result)
    if(err) throw err

    if(result){
      res.json({response:true,Message:"Employee Deleted"})
    }else{
      res.json({response:false,Message:"Employee Not Deleted"})
    }
  })

})


router.delete('/employee',(req,res)=>{
  
  

  dbConnect.DB.query(`DELETE FROM Employee.employeeData `,(err,result)=>{

    console.log(result)
    if(err) throw err

    if(result){
      res.json({response:true,Message:"All Employee Deleted"})
    }else{
      res.json({response:false,Message:"All Employee Not Deleted"})
    }
  })

})


router.get('/employeeByName',(req,res)=>{


  const {Name} = req.query

  dbConnect.DB.query(`SELECT * FROM Employee.employeeData WHERE FName LIKE '%${Name}%'`,(err,result)=>{
    if(err) throw err

    if(result.length > 0){
      res.json({response:true,Message:"Employee Data Found", detail:result})
    }else{
      res.json({response:false,Message:"Employee Data Not Found", detail:result})
    }
  })
})




module.exports = router;
