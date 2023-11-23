import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRegalitosComponent } from './list-regalitos/list-regalitos.component';
import { RegalitoPageComponent } from './regalito-page/regalito-page.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListRegalitosComponent,
    RegalitoPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RegalitoModule { }
