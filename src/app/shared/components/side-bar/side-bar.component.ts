import { Component, OnInit } from '@angular/core';
import { Friendship } from 'src/app/core/models/Friendship';
import { Meli } from 'src/app/core/models/Meli';
import { FriendshipRepository } from 'src/app/repository/friendship/friendshipRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  
  public friends: Friendship[] = [];

  userId: number | undefined

  constructor(private friendshipRepository: FriendshipRepository, private tokenRepository: TokenRepository){
    this.userId = this.tokenRepository.getAccessToken()?.user_id
  }
  
  ngOnInit(): void {
    this.listFriends();
  }

  public listFriends(){
    this.friendshipRepository.getFriends(this.userId).then(data => this.friends = data);
  }

  public addFriend(friendship: Friendship) {
    this.friendshipRepository.addFriend(friendship).then(data => console.log("Se agrego la amistad:", data));
    this.listFriends();
  }

  public deleteFriend(id: number) {
    this.friendshipRepository.deleteFriend(id).then(bool => console.log("Se elimino la amistad: ", bool));
    this.listFriends();
  }

}
