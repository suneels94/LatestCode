import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usernameResponse: any;
  passwordResponse: any;
  constructor(private userService: UserService, private auth: AuthService, private Toaster: ToastrService, private http: HttpClient, private router: Router){}
  outputValue: any;
  loginformdata: any;
  parentMessage : string | undefined;
  responsedata: any;
  currentUser: any;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }); 
  ngOnInit(): void { 
    this.parentMessage = "Suneel";
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  } 
  onSubmit(): void {
    // Auth route service Starts here
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          this.Toaster.success('Successfully Logged in', 'Success');
          this.loginForm.reset();
          this.router.navigate(['/admin']);
        },
        (err: Error) => {
          this.Toaster.error('UserName/Password MissMatch', 'CrossCheck');
        }
      );
    }
    // Auth route service Ends here


    // this.outputValue = this.loginForm.value.username;
    // this.loginformdata = this.loginForm.value.password;
    // this.userService.getUser(this.outputValue).subscribe((response)=>{
    //   console.log(JSON.stringify(response));     
    //   this.responsedata = JSON.stringify(response); 
    //   const userDetails = response.find((matchme: any)=>{
    //     return matchme.username === this.loginForm.value.username && matchme.password === this.loginForm.value.password;
    //   })    
    //   if(userDetails){
    //     this.Toaster.success('Successfully Logged in', 'Success');
    //     this.loginForm.reset();
    //     this.router.navigate(['/home']);
    //   } else {
    //     this.router.navigate(['/login']);
    //     this.Toaster.error('UserName/Password MissMatch', 'CrossCheck');
    //     console.log(this.loginForm);          
    //   }      
      
    // },(error)=>{
    //   console.log("responseValue",error);
    //   this.Toaster.error('Something went Wrong', 'Error');
    // })    
  }


}
