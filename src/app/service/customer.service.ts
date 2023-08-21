import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  addCustomerURL : string;
  getCustomerURL : string;
  updateCustomerUrl : string;
  deleteCustomerUrl : string;

  constructor(private http : HttpClient) { 
    this.addCustomerURL = 'https://getinvoices.azurewebsites.net/api/Customer/';
    this.getCustomerURL = 'https://getinvoices.azurewebsites.net/api/Customers';
    this.updateCustomerUrl = 'https://getinvoices.azurewebsites.net/api/Customer/';
    this.deleteCustomerUrl = 'https://getinvoices.azurewebsites.net/api/Customer/';
  }

  addCustomer(custm : Customer): Observable<Customer> {
    return this.http.post<Customer>(this.addCustomerURL,custm);
  }

  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.getCustomerURL);
  }

  updateCustomer(custm :Customer) : Observable<Customer>{
    return this.http.post<Customer>(this.updateCustomerUrl + custm.id, custm);
  }

  deleteCustomer(custm : Customer) : Observable<Customer> {
    return this.http.delete<Customer>(this.deleteCustomerUrl + custm.id);
  }


}
