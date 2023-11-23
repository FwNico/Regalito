import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Error404Component } from './components/error404/error404.component';
import { FriendsModule } from '../modules/friends/friends.module';
import { FooterComponent } from './components/footer/footer.component';
import { TokenRepository } from '../repository/token/tokenRepository';
import { UserRepository } from '../repository/user/userRepository';
import { UserService } from '../core/services/user/userService.service';


@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    Error404Component,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FriendsModule
  ],
  exports: [
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
  ],
  providers:[
    UserRepository,
    TokenRepository,
    UserService
  ]
})
export class SharedModule { }
