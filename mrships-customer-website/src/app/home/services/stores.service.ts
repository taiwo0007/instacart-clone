import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Store} from "../models/store";

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http:HttpClient) {}

  fetchStores() : Observable<Store[]>{

    return this.http.get<Store[]>(environment.appUrl+'/stores')
  }
}
