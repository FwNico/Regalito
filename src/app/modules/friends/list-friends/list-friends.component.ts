import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Friendship } from 'src/app/core/models/Friendship';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.css']
})
export class ListFriendsComponent implements OnInit {

  @Input() friends: Friendship[] = [];
  @Output() friendToDelete: EventEmitter<number> = new EventEmitter();
  @Output() friendToDelete2: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  public deleteFriend(id: number) {
    this.friendToDelete.emit(id);
    //this.friendToDelete2.emit((id+1!));
  }

  navigate(userId: number) {
    this.router.navigate(['/user', userId])
  }

}
