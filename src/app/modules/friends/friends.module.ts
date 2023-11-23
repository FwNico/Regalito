import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFriendsComponent } from './list-friends/list-friends.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListFriendsComponent,
    AddFriendsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    AddFriendsComponent,
    ListFriendsComponent
  ]
})
export class FriendsModule { }
