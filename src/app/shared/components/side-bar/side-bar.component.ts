import { Component, OnInit } from '@angular/core';
import { Friendship } from 'src/app/core/models/Friendship';
import { FriendshipRepository } from 'src/app/repository/friendship/friendship';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  
  public friends: Friendship[] = [];

  constructor(private friendshipRepository: FriendshipRepository){

  }
  
  ngOnInit(): void {
    this.searchFriends();
  }

  public searchFriends(){
    this.friendshipRepository.getFriends().then(data => this.friends = data);
  }

  public addFriend(friendship: Friendship) {
    this.friendshipRepository.addFriend(friendship).then(data => console.log("Se agrego la amistad:", data));
    this.searchFriends();
  }

  public deleteFriend(id: number) {
    this.friendshipRepository.deleteFriend(id).then(bool => console.log("Se elimino la amistad: ", bool));
    this.searchFriends();
  }

}
