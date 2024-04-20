import {inject, Injectable} from '@angular/core';
import {IUser} from "../models/user";
import {UsersApiService} from "./users-api.service";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public users: IUser[] = []
  public userApi: UsersApiService = inject(UsersApiService)
  public userSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject(this.users)
  public users$ = this.userSubject$.asObservable()
  public localStorageService = inject(LocalStorageService)

  constructor() {
    this.getUsers()
  }

  public getUsers() {
    this.userApi.getUsers()
      .subscribe(

      (response: IUser[]) => {

        if(this.localStorageService.getItem('users')) {
        } else {
          this.userSubject$.next(response)
          this.localStorageService.setItem('users', response)
        }

      }
    )
  }

  public editUser(userToEdit: IUser) {
    this.userSubject$.next(
      this.userSubject$.value.map(
        (user: IUser): IUser => user.id === userToEdit.id ? userToEdit : user
      )
    )
  }

  public deleteUser(id: number): void {
    this.userSubject$.next(
      this.userSubject$.value.filter((item: IUser) => item.id !== id)
    )
  }

  public addUser(userToAdd: IUser) {
    this.userSubject$.next(
      this.userSubject$.value.concat(userToAdd)
    )
  }

}
