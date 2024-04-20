import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IUser} from "../models/user";
import {delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private http: HttpClient = inject(HttpClient)

  public getUsers() {
      return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
  }
}


