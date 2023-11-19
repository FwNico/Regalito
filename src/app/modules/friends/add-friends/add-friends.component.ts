import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Friendship } from 'src/app/core/models/Friendship';
import { Meli } from 'src/app/core/models/Meli';
import { User } from 'src/app/core/models/User';
import { FriendshipService } from 'src/app/core/services/friendship/friendship.service';
import { UserService } from 'src/app/core/services/user/userService.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { Observable, Subject, debounceTime, distinctUntilChanged, finalize, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit{

  @Output() public onNewFriend: EventEmitter<Friendship> = new EventEmitter();  

  
  public friendship: Friendship = new Friendship(
    { 
      id: null
    }
  );

  addFriendForm: FormGroup = this.formBuilder.group({
    nickname: new FormControl('', [Validators.required])
  })

  meli: Meli | null 

  userList: User[] =[];
  searchResults: User[] =[];

  nickname: string = '';

/*   public isLoading = true;
  public src: string= ""; */

/*   users$: Observable<User[]>;
  searchTerm$ = new Subject<string>(); */

  constructor(private formBuilder: FormBuilder, private userService: UserService, private tokenRepository: TokenRepository, private friendshipService: FriendshipService){
/*     this.users$ = this.searchTerm$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string)=> this.userService.searchUser(term))
    ) */
    this.meli = this.tokenRepository.getAccessToken();
    if(this.meli != null){
      this.friendship.userId = this.meli.user_id
    }
    

  }
  
  ngOnInit(): void {
    this.getAllUsers();
  }

/*   search(event: Event): void{

    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$.next(element.value);
  } */

  filterSearch(): void{
    this.searchResults = this.userList.filter(user => 
      user.id != this.meli?.user_id &&
      user.nickname?.toUpperCase().includes(this.nickname.toUpperCase()));
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: (data) =>{
          this.userList = data;
            },
      error: (error) => {console.log(error)} 
    })
}

  
  public getUserByNickname(nickname: string){
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
/*     this.nickname = this.addFriendForm.value.nickname
    this.getUserByNickname(this.nickname) */
  

    //this.onNewFriend.emit(this.friendship);
  }



}
