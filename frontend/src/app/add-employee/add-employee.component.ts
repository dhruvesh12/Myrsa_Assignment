import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ApiManagementService } from '../Service/api-management.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {


  //  @Input()
  submitted: boolean = false;

  alertActive:boolean = false
  
   @Output() childToParent = new EventEmitter<any>();
   @ViewChild('search') search !: ElementRef;

  AddEmp!:FormGroup

  element !: HTMLElement;

  constructor(private FormBuilder : FormBuilder,private service : ApiManagementService){}

  


  ngOnInit():void{

    this.AddEmp = this.FormBuilder.group({
      FirstName : ['',Validators.required],
      LastName : ['',Validators.required],
      Age : ['',Validators.required]
    })

  }

  

  

  Submit(){
    
    this.submitted = true
    if(this.AddEmp.invalid){
      return
    }

    
    
    this.service.insertEmployee(this.AddEmp.value).subscribe(response=>{
      console.log('Added Sucessfully')
      this.submitted = false
      this.alertActive = true
      this.AddEmp.reset()
      // document.getElementById('sub')?.click()
      
      setTimeout(()=>{
        this.service.getAllEmployee()
        this.alertActive = false
        this.search.nativeElement.click()
        
      },1000)
      })
    
   
  }




}
