import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Friendship } from 'src/app/core/models/Friendship';
import { Meli } from 'src/app/core/models/Meli';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user/userService.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { UserRepository } from 'src/app/repository/user/userRepository';

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

  user: User = new User ({})

  nickname: string = '';

  constructor(private formBuilder: FormBuilder, private userRepository: UserRepository, private userService: UserService, private tokenRepository: TokenRepository){
    this.meli = this.tokenRepository.getAccessToken()
    if(this.meli != null){
      this.friendship.userId = this.meli.user_id
    }

  }
  
  
  ngOnInit(): void {
    
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
    this.nickname = this.addFriendForm.value.nickname
    this.getUserByNickname(this.nickname)
  

    //this.onNewFriend.emit(this.friendship);
  }



}
