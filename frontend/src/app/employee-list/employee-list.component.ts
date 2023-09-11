import { Component, ComponentFactoryResolver } from '@angular/core';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ApiManagementService } from '../Service/api-management.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  submitted : boolean = false
  alertActive: boolean = false

  EmployeeForm !: FormGroup

  EmployeeId:any

  


  constructor(public service: ApiManagementService,private FormBuilder : FormBuilder){}

  ngOnInit():void{

    this.EmployeeForm = this.FormBuilder.group({
      FName : ['',Validators.required],
      LName : ['',Validators.required],
      Age : ['',Validators.required],
      Id : ['']
    })
  }


  getEmployeeById(Id:any){
    this.service.getEmployeeById(Id.id).subscribe(response=>{
      let data = response.detail[0]
      this.EmployeeForm.setValue({FName:data.FName,LName:data.LName,Age:data.Age,Id:data.id})
    })
    
  }


  updateEmployee(){

    this.submitted = true

    if(this.EmployeeForm.invalid){
      return
    }

    this.service.updateEmployee(this.EmployeeForm.get('Id')?.value,this.EmployeeForm.value).subscribe(response=>{
      if(response.response){

         this.alertActive = true

        setTimeout(()=>{
          this.alertActive = false
          document.getElementById('sub')?.click()
          this.service.getAllEmployee()
        },1000)
      }
    })
    
  }

  deleteEmployee(){

    this.service.deleteEmployee(this.EmployeeId).subscribe(response=>{
      if(response.response){
        setTimeout(()=>{
          this.service.getAllEmployee()
        },500)
      }
    })


  }

  

}
