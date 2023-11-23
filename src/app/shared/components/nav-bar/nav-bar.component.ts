import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/userService.service';
import { TokenRepository } from '../../../repository/token/tokenRepository';
import { Meli } from 'src/app/core/models/Meli';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: string | null = ""
  meli: Meli | null

  constructor(private router: Router, private userService: UserService, private tokenRepository: TokenRepository) {
    this.meli = tokenRepository.getAccessToken()
  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.userService.getUserById(this.meli?.user_id!).subscribe({
      next: (data) => { this.user = data.nickname },
      error: (error) => { console.log("error al traer usuario")}
    })
  }

  public goToRegalito() {
    this.router.navigate(["/regalito"]);
  }
}
