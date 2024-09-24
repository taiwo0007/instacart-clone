import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalculatedFee } from '../models/calculated-fee.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }



calculateFee(initial_total:number){


  return this.http.post<CalculatedFee>(environment.appUrl+"/fees/calculate",{
    initial_total
  })
}
}
