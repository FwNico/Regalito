import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/userService.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    
  }

  public goToRegalito() {
    this.router.navigate(["/regalito"]);
  }
}
