import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {IUser} from "../../models/user";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {UsersService} from "../../services/users.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})

export class UserCardComponent {
  public userService = inject(UsersService)

  public dialogRef!: MatDialogRef<CreateEditUserComponent>
  public dialog: MatDialog = inject(MatDialog)

  localStorageService = inject(LocalStorageService)

  @Input() user!: IUser
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>()

  onDelete(user: IUser) {
    this.deleteUser.emit(user)
  }

  onEdit(newUser: IUser) {

    this.dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        isEdit: true,
        user: newUser
      },
      width: '400px'
    })

    this.dialogRef.afterClosed().subscribe((userToEdit) => {
      if(userToEdit) {
        this.userService.editUser({ ...newUser, ...userToEdit })
        this.localStorageService.setItem('users',
          this.localStorageService.getItem('users').map((user: IUser) => user.id === userToEdit.id ? userToEdit : user)
        )
      }
    })

  }

}
