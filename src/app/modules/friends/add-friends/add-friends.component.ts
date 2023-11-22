import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Friendship } from 'src/app/core/models/Friendship';
import { Meli } from 'src/app/core/models/Meli';
import { User } from 'src/app/core/models/User';
import { FriendshipService } from 'src/app/core/services/friendship/friendship.service';
import { UserService } from 'src/app/core/services/user/userService.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { Observable, Subject, debounceTime, distinctUntilChanged, finalize, map, switchMap } from 'rxjs';
import { FriendshipRepository } from 'src/app/repository/friendship/friendshipRepository';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit{

  @Output() public onNewFriend: EventEmitter<Friendship> = new EventEmitter();
  @Output() public onNewPendingFriend: EventEmitter<Friendship> = new EventEmitter();

  
  public friendship: Friendship = new Friendship(
    { 
      id: null
    }
  );

  public pendingFriendship: Friendship = new Friendship(
    { 
      id: null
    }
  );

/*   addFriendForm: FormGroup = this.formBuilder.group({
    nickname: new FormControl('', [Validators.required])
  }) */


  userId: number | undefined

  userList: User[] =[];
  searchResults: User[] =[];
  friendships: Friendship[] =[];

  searchInput: string = '';
  userToAdd: User = new User({});
  loguedUser: User = new User({});

  constructor(private formBuilder: FormBuilder, private userService: UserService, private friendshipRepository: FriendshipRepository,
    private tokenRepository: TokenRepository, private friendshipService: FriendshipService){
      this.userId = this.tokenRepository.getAccessToken()?.user_id;
      if(this.userId != undefined){
        this.friendship.userId = this.userId
      }
      this.userService.getUserById(this.friendship.userId!).subscribe({
        next: (data) => { this.loguedUser = data}
      })
      

  }
  
  ngOnInit(): void {
    this.getAllUsers();
    this.listFriends();
  }

  public listFriends(){
    this.friendshipRepository.getFriends(this.userId).then( data => this.friendships = data);
  }

/*   listFriends(){
    this.friendshipService.getAllFriendships(this.userId).subscribe({
      next: (data) => { this.friendships = data},
      error: (error) => {console.log("Error al traer la lista de amigos", error)}
    })
  } */

    //this.friendshipRepository.getFriends(this.userId).then(data => this.friendships = data);
/*     try {
      await this.friendshipRepository.getFriends(this.userId).then(data => this.friendships = data);
    } catch (error) {
      console.log("Ocurrió un error al cargar la lista de amistades");
    } */
  

  filterSearch(): void{
    //primero filtramos la busqueda para que no muestre al usuario logueado ni a usuarios que no coincidan con el input
    this.searchResults = this.userList.filter(user => 
      user.id != this.userId &&
      user.nickname?.toUpperCase().includes(this.searchInput.toUpperCase())
    );
    //despues eliminamos de ese resultados aquellos usuarios que ya son amigos del usuario logueado
    this.friendships.forEach((item)=> {
      for(let i=0; i < this.searchResults.length; i++){
        if(this.searchResults[i].id == item.friend.id){
          this.searchResults.splice(i, 1);
        }
      }
    }
    );
    this.listFriends(); 
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: (data) =>{
          this.userList = data;
            },
      error: (error) => {console.log(error)} 
    })
  }

  public addFriend(id: number){
    this.userService.getUserById(id).subscribe({
      next: (data) =>{
        this.friendship.friend = data;
        this.onNewFriend.emit(this.friendship);
/*         this.pendingFriendship.userId = id;
        this.pendingFriendship.friend = this.loguedUser;
        this.onNewPendingFriend.emit(this.pendingFriendship); */
        this.searchInput ="";
      },
      error: (error) => {console.log("Error al añadir un amigo", error)}
    })
    this.listFriends();
  }

  
/*   public getUserByNickname(nickname: string){
    this.userService.getUserByNickname(nickname).subscribe({
      next: (resp) => {
        if(resp != null){
          this.friendship.friend = resp
          this.onNewFriend.emit(this.friendship);
        }else{ console.log(resp)}
      },
      error: (error) => { console.log(error)}
    })
  }

  public onSubmit(){
    this.nickname = this.addFriendForm.value.nickname
    this.getUserByNickname(this.nickname)
  

    //this.onNewFriend.emit(this.friendship);
  } */



}
