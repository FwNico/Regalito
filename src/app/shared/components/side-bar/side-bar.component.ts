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
  public editFriendship: Friendship = new Friendship ({});
  public editFriendship2: Friendship = new Friendship ({});
  public friendship2: Friendship = new Friendship ({});

  userId: number | undefined


  constructor(private friendshipRepository: FriendshipRepository, private tokenRepository: TokenRepository, private friendshipService: FriendshipService){
    this.userId = this.tokenRepository.getAccessToken()?.user_id
  }
  
  ngOnInit(): void {
    this.listFriends();
  }

  public listFriends(){
/*     setTimeout(()=> {this.friendshipRepository.getFriends(this.userId).then ( data => this.friends = data)
    .catch (error => console.log("Ocurrió un error al cargar la lista de amistades", error))
    }, 200) */
    this.friendshipRepository.getFriends(this.userId).then ( data => this.friends = data)
    .catch (error => console.log("Ocurrió un error al cargar la lista de amistades", error))
    
  }

  public addFriend(friendship: Friendship) {
    this.friendshipRepository.addFriend(friendship).then(data => console.log("Se agrego la amistad:", data));
    this.listFriends();

  }

  public deleteFriend(id: number) {
    this.friendshipRepository.deleteFriend(id).then(bool => console.log(`Se elimino la amistad con Id: ${id}`,  bool));
    this.listFriends();
  }

  public getFriend(id:number){
    this.friendshipRepository.getFriend(id).then(data => this.friendship2 = data);
  }

  public updateFriendship(friendship: Friendship){

    if(friendship.id){
      this.getFriend((friendship.id -1))
      setTimeout( ()=> {
      this.editFriendship2 = structuredClone(this.friendship2);
      this.editFriendship2.status = "active";
      this.friendshipRepository.updateFriendship(this.editFriendship2).then(bool => console.log("Se modificó la amistad: ", bool));
      }, 500) 
    }

    this.editFriendship = structuredClone(friendship);
    this.editFriendship.status = "active";
    this.friendshipRepository.updateFriendship(this.editFriendship).then(bool => console.log("Se modificó la amistad: ", bool));
    
    this.listFriends();
  }

  public rejectFriendship(id: number){
    this.friendshipRepository.deleteFriend(id).then(bool => console.log(`Se elimino la amistad con Id: ${id}`,  bool));
    this.friendshipRepository.deleteFriend((id-1)).then(bool => console.log(`Se elimino la amistad con Id: ${(id-1)}`,  bool));

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
