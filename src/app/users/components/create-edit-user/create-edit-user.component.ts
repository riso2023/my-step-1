import {Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatButton,
    MatDialogClose,
    MatIcon,
    NgIf
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})

export class CreateEditUserComponent implements OnInit{

  public dialogRef: MatDialogRef<CreateEditUserComponent> = inject(MatDialogRef<CreateEditUserComponent>)

  public dialogForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  public data = inject(MAT_DIALOG_DATA)

  ngOnInit() {
    if(this.data.user) {
      this.dialogForm.patchValue(this.data.user)
    }
  }

  onClick(): void {
    this.dialogRef.close(this.dialogForm.value)
  }

}


