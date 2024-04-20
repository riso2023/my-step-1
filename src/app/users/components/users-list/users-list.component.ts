import {Component, inject, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";
import {IUser} from "../../models/user";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatButton} from "@angular/material/button";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    UserCardComponent,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public userService = inject(UsersService)
  public dialog = inject(MatDialog)
  public dialogRef!: MatDialogRef<CreateEditUserComponent>
  public localStorageService = inject(LocalStorageService)
  public localUsers!: IUser[]

  ngOnInit(): void {

    //this.localUsers = this.localStorageService.getItem('users')

    // if(this.localUsers.length === 0) {
    //   this.userService.getUsers()
    //   return
    // }

    this.userService.userSubject$.next(this.localStorageService.getItem('users'))

  }

  openDialog() {

    this.dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { isEdit: false },
      width: '400px'
    })

    this.dialogRef.afterClosed().subscribe((userToAdd) => {
      if(userToAdd) {
        this.userService.addUser(userToAdd)
        this.localStorageService.setItem('users', this.localStorageService.getItem('users').concat(userToAdd))
      }
    })

  }

  onDelete(user: IUser) {
    this.userService.deleteUser(user.id)

    const users: IUser[] = this.localStorageService.getItem('users')

    if(users !== null) {
      this.localStorageService.setItem(
        'users',
        users.filter((item: IUser) => item.id !== user.id)
      )
    }
  }

}
