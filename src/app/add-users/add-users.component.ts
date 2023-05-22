import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import  { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit{
 url="https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg";
 onSelect(event:any){
  
  if(event.target.files[0]){
    let reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      this.url = event.target.result;
    }
  }
 }
  angForm:FormGroup
  constructor(private fb:FormBuilder,private dataService:DataService,private route:Router){
    this.angForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      address: ['',Validators.required],
    })
  }

  ngOnInit(): void {
  }
  postdata(data:any){
    this.dataService.AddUser(this.angForm.value).subscribe(data=>{
      this.route.navigate(['list-users']);
    })
  }
}
