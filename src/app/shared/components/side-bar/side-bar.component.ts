import { Component, OnInit } from '@angular/core';
import { Friendship } from 'src/app/core/models/Friendship';
import { FriendshipRepository } from 'src/app/repository/friendship/friendshipRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { FriendshipService } from 'src/app/core/services/friendship/friendship.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  
  public friends: Friendship[] = [];

  userId: number | undefined


  constructor(private friendshipRepository: FriendshipRepository, private tokenRepository: TokenRepository, private friendshipService: FriendshipService){
    this.userId = this.tokenRepository.getAccessToken()?.user_id
  }
  
  ngOnInit(): void {
    this.listFriends();
  }

  public listFriends(){
    this.friendshipRepository.getFriends(this.userId).then( data => this.friends = data);
  }

  public addFriend(friendship: Friendship) {
    this.friendshipRepository.addFriend(friendship).then(data => console.log("Se agrego la amistad:", data));
    this.listFriends();

  }

  public deleteFriend(id: number) {
    this.friendshipRepository.deleteFriend(id).then(bool => console.log("Se elimino la amistad: ", bool));
    this.listFriends();
  }

/*   public listFriends2(){
    this.friendshipService.getAllFriendships(this.userId).subscribe({
      next: (data) => { this.friends = data},
      error: (error) => {console.log("Error al traer la lista de amigos", error)}
    })
  }

  public addFriend(friendship: Friendship){
    this.friendshipService.postFriendship(friendship).subscribe({
      next: (data)=> {console.log("Se agregó la amistad", data)},
      error: (error)=> {console.log("Error al añadir la amistad", error)}
    });
    this.listFriends();
  }

  public deleteFriend(id: number){
    this.friendshipService.deleteFriendship(id).subscribe({
      next: (bool)=> {console.log("Se eliminó la amistad", bool)},
      error: (error)=> {console.log("Error al eliminar la amistad", error)}
    });
    this.listFriends();
  } */


}
