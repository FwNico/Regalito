import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Friendship } from 'src/app/core/models/Friendship';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.css']
})
export class ListFriendsComponent implements OnInit {

  @Input() friends: Friendship[] = [];
  @Output() friendToDelete: EventEmitter<number> = new EventEmitter();
  @Output() friendRejected: EventEmitter<number> = new EventEmitter();
  @Output() friendshipToUpdate: EventEmitter<Friendship> = new EventEmitter();

  constructor(){ 

  }
  
  ngOnInit(): void{

  }
  
  public deleteFriend(id: number) {
    this.friendToDelete.emit(id);
    //this.friendToDelete2.emit((id+1!));
  }

  public rejectFriendship(id:number){
    this.friendRejected.emit(id);
  }

  public acceptFriendship(friendship: Friendship){
    // change status to active
    this.friendshipToUpdate.emit(friendship);
  }

}
