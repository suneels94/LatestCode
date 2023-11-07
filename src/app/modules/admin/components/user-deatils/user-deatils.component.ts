import { Component,OnInit,TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { InfoPopupComponent } from '../info-popup/info-popup.component';
// import { MatDialog} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-user-deatils',
  templateUrl: './user-deatils.component.html',
  styleUrls: ['./user-deatils.component.css']
})
export class UserDeatilsComponent {
  modalRef?: BsModalRef;
  constructor(public dialog: MatDialog,private bottomSheet: MatBottomSheet,private formBuilder: FormBuilder,private modalService: BsModalService,private userService: UserService, private Toaster: ToastrService){}  
  getTableDetails: any;
  logic:any;
  submitted : boolean = false;
  createuser : boolean = false;
  SaveData: any;
  updateuser = false;
  outputValue: any;
  registrationGroup = this.formBuilder.group({
    id:[],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  ngOnInit() {
    this.loadTableData();
  }
  get f() { return this.registrationGroup.controls; }
  formSubmit(){
    if(this.SaveData == "Create"){
      this.createForm()
    } else{
      this.updateForm()
    }
  }
  createForm() {
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
  updateForm(){
    if(this.registrationGroup.invalid){
      return;
    }
    this.outputValue = this.registrationGroup.value.id;
    console.log(this.outputValue.id);
    
    this.userService.updateEmployee(this.outputValue.id).subscribe((response)=>{
      this.Toaster.success('Updated Successfully', 'Success');
    }, (error)=>{
      console.log("responseValue:::",error);
      this.Toaster.error('Something went Wrong', 'Error');
    })
  }
  loadTableData(){
    this.userService.getUser().subscribe((response)=>{
     // this.Toaster.success('Successfully Retrived', 'Success');
      this.getTableDetails = response;
      this.logic = response;
      // display unique values / removing duplicates logic Starts here
      // this.logic = [...new Set(this.logic.map((item: { phone: any; }) => item.phone))];  // This prints only unique values
      const phone = 'phone'
      const datavalue = [...new Map(this.logic.map((item: { [x: string]: any; }) => [item[phone], item])).values()]; // This prints unique values with whole object
      this.logic = datavalue.sort(function (a: any,b:any) { return a.firstname - b.firstname; });
      // display unique values / removing duplicates logic Ends here

    },(error)=>{
      console.log("responseValue",error);
      this.Toaster.error('Something went Wrong', 'Error');
    })
  }
  editDetails(tabelData:any,data: any){
    this.SaveData = "Update";
    this.modalRef = this.modalService.show(tabelData);
    console.log("data::",data);
    
    this.registrationGroup.controls['email'].setValue(data.email);
    this.registrationGroup.controls['firstname'].setValue(data.firstname);
    this.registrationGroup.controls['lastname'].setValue(data.lastname);
    this.registrationGroup.controls['phone'].setValue(data.phone);
    this.registrationGroup.controls['username'].setValue(data.username);
    this.registrationGroup.controls['password'].setValue(data.password);
    this.registrationGroup.controls['id'].setValue(data.id);
  }
  openModal(template: TemplateRef<any>) {
    this.SaveData = "Create";
    this.registrationGroup.reset();
    this.modalRef = this.modalService.show(template);
  }
  openBottomSheet() {
    // this.dialog.open(InfoPopupComponent,{
    //   width: '600px'
    // })
    this.bottomSheet.open(InfoPopupComponent);
  }
}

