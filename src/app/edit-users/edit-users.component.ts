import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import  { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit{
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
  constructor(private fb:FormBuilder,private dataService:DataService,private route:Router,private activatedRoute: ActivatedRoute){
    this.angForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      address: ['',Validators.required],
    })
  }
 id:any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);
      this.dataService.getSingleuser(this.id).subscribe(data=>{
        this.angForm.patchValue(data);
      })
    })
  }
  postdata(data:any){
    this.dataService.editUser(this.id,this.angForm.value).subscribe(data=>{
      this.route.navigate(['list-users']);
    })
  }
}
