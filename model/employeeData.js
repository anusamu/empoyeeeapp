
const mongoose=require('mongoose');
// create schema
const employeeSchema=mongoose.Schema({
    EmployeeName:String,
    EmployeeDesignation:String,
    EmployeeLocation:String,
    Salary:Number
})
const employeeData=mongoose.model('employee',employeeSchema);
module.exports=employeeData;