import { Component, ComponentFactoryResolver, HostListener,ComponentRef, ViewChildren, QueryList  } from '@angular/core';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { Router } from '@angular/router';
import { ApiManagementService } from './Service/api-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';


  submitted : boolean = false
  searchEmployeeForm !: FormGroup

  @ViewChildren(AddEmployeeComponent)
  FirstComponent !: QueryList<AddEmployeeComponent>

  
  
  constructor(public service : ApiManagementService, private FormBuilder : FormBuilder){}

  ngOnInit() {
    this.service.getAllEmployee()

    this.searchEmployeeForm = this.FormBuilder.group({
      FName : ['',Validators.required],
      
    })
  }

  resetForm() {
    this.FirstComponent.first.AddEmp.reset()
    this.FirstComponent.first.submitted=false
    
  }

  

  deleteAllEmployee(){
    this.service.deleteAllEmployee().subscribe(response=>{
      console.log("Deleted")
    })
    setTimeout(()=>{
      this.service.getAllEmployee()
    },500)
  }


  searchByName(){
    this.submitted = true

    if(this.searchEmployeeForm.invalid){
      return
    }


    this.service.searchByName(this.searchEmployeeForm.get('FName')?.value).subscribe(response=>{
      if(response){
        this.service.AllEmployeeData = response.detail
      }
    })
  }

  

  

  
}
