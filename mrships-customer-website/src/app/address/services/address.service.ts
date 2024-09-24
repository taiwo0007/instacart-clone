import { Address } from './../../home/models/address.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  addNewAddress(address:Address, email: string){

    return this.http.post<number>(environment.appUrl+"/address/add-address",{

      address,
      email,
      setAsPrimaryAddress:false
    }
    )
  }


  updateExistingAddress(address:Address, email: string, setAsPrimaryAddress:boolean){

    return this.http.put<number>(environment.appUrl+"/address/update-address",{

      address,
      email,
      setAsPrimaryAddress
    }
    )
  }
}
