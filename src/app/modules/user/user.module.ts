import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';




@NgModule({
  declarations: [
    ViewUserComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
