import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFriendsComponent } from './list-friends/list-friends.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListFriendsComponent,
    AddFriendsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    AddFriendsComponent,
    ListFriendsComponent
  ]
})
export class FriendsModule { }
