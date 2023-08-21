import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/service/customer.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  custDetail !: FormGroup;
  custObj : Customer = new Customer();
  custList : Customer[] = [];

  constructor(private formBuilder : FormBuilder, private custService : CustomerService) { }
  
  isLoading : boolean = true;

  ngOnInit(): void {

    this.getAllCustomers();

    this.custDetail = this.formBuilder.group({
      id : [''],
      firstname : [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      phone_Number : [''],
      country_code : [''],
      gender: [''],
      balance: ['']
    });

  }

  clearData() {
    this.custDetail = this.formBuilder.group({
      id : [''],
      firstname : [''],
      lastname: [''],
      email: [''],
      phone_Number : [''],
      country_code : [''],
      gender: [''],
      balance: ['']
    });
  }

  addCustomer() {
    
    this.custObj.id = this.custDetail.value.id;
    this.custObj.firstname = this.custDetail.value.firstname;
    this.custObj.lastname = this.custDetail.value.lastname;
    this.custObj.email = this.custDetail.value.email;
    this.custObj.phone_Number = this.custDetail.value.phone_Number;
    this.custObj.country_code = this.custDetail.value.country_code;
    this.custObj.gender = this.custDetail.value.gender;
    this.custObj.balance = this.custDetail.value.balance;

    this.custService.addCustomer(this.custObj).subscribe(res=>{
        console.log(res);
        alert("Customer Added Sucessfully");
        this.getAllCustomers();
    },err=>{
        console.log(err);
    });
  }

  getAllCustomers() {
    this.isLoading = true;
    this.custService.getAllCustomer().subscribe(res=>{
        this.custList = res;
        this.isLoading = false;
    },err=>{
      console.log("error while fetching data.");
      this.isLoading = true;
    });
  }


  editCustomer(cust : Customer) {
    this.custDetail.controls['id'].setValue(cust.id);
    this.custDetail.controls['firstname'].setValue(cust.firstname);
    this.custDetail.controls['lastname'].setValue(cust.lastname);
    this.custDetail.controls['email'].setValue(cust.email);
    this.custDetail.controls['phone_Number'].setValue(cust.phone_Number);
    this.custDetail.controls['country_code'].setValue(cust.country_code);
    this.custDetail.controls['gender'].setValue(cust.gender);
    this.custDetail.controls['balance'].setValue(cust.balance);
  }


  updateCustomer() {
    this.custObj.id = this.custDetail.value.id;
    this.custObj.firstname = this.custDetail.value.firstname;
    this.custObj.lastname = this.custDetail.value.lastname;
    this.custObj.email = this.custDetail.value.email;
    this.custObj.phone_Number = this.custDetail.value.phone_Number;
    this.custObj.country_code = this.custDetail.value.country_code;
    this.custObj.gender = this.custDetail.value.gender;
    this.custObj.balance = this.custDetail.value.balance;

    this.custService.updateCustomer(this.custObj).subscribe(res=>{
      console.log(res);
      alert("Customer Updated Sucessfully");
      this.getAllCustomers();
    },err=>{
      console.log(err);
    })

  }


  deleteCustomer(cust : Customer) {
    this.custService.deleteCustomer(cust).subscribe(res=>{
      console.log(res);
      alert('Customer deleted successfully');
      this.getAllCustomers();
    },err => {
      console.log(err);
    });
  }

}
