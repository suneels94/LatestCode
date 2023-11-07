import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private formBuilder: FormBuilder,private userService: UserService, private Toaster: ToastrService){}
  outputValue: any;
  submitted : boolean = false;
  registrationGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  }); 
  ngOnInit() { 
  } 
  get f() { return this.registrationGroup.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registrationGroup.invalid) {
      return;
    }
    this.outputValue = this.registrationGroup.value;
    this.userService.createEmployee(this.outputValue).subscribe((response)=>{
      this.registrationGroup.reset();
      this.Toaster.success('Successfully Registered', 'Success');
    },(error)=>{
      console.log("responseValue",error);
      this.Toaster.error('Something went Wrong', 'Error');
    })
  }
// Email Validator directive
// import { Directive } from '@angular/core';
// import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, ValidatorFn } from '@angular/forms';

// export function emailValidator(): ValidatorFn {

//   const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//   return (control: AbstractControl): ValidationErrors | null => {
//     const isValid = EMAIL_REGEXP.test(control.value);

//     if (isValid) {
//       return null;
//     } else {
//       return {
//         emailValidator: {
//           valid: false,
//         },
//       };
//     }
//   };

// }

// @Directive({
//   selector: '[appEmailValidator]',
//   providers: [{
//     provide: NG_VALIDATORS,
//     useExisting: EmailValidatorDirective,
//     multi: true,
//   }],
// })
// export class EmailValidatorDirective implements Validator {

//   constructor() {
//   }

//   public validate(control: AbstractControl): ValidationErrors | null {
//     return emailValidator()(control);
//   }

// }


}
