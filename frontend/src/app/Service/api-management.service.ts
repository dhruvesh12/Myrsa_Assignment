import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManagementService {

  AllEmployeeData : any[] = []

  baseUrl:string = "http://localhost:3000/api/"

  constructor(private http : HttpClient) { }

  ngOnInit():void{
    this.getAllEmployee()
  }



  insertEmployee(data:any):Observable<any>{
    return this.http.post(this.baseUrl + 'employee',data)
  }


  getAllEmployee(){
    this.http.get(this.baseUrl + 'employee').subscribe((response:any)=>{
      this.AllEmployeeData = response.detail
      
    })
  }


  getEmployeeById(data:any):Observable<any>{
    return this.http.get(this.baseUrl+'employee/'+data)
  }


  updateEmployee(id:any,data:any):Observable<any>{
    return this.http.put(this.baseUrl+'employee/'+id,data)
  }

  deleteEmployee(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+'employee/'+id)
  }

  deleteAllEmployee():Observable<any>{
    
    return this.http.delete(this.baseUrl+'employee')
  }

  searchByName(Name:any):Observable<any>{
    
    return this.http.get(this.baseUrl+'employeeByName'+'?'+'Name='+Name)
  }
}
