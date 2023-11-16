import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Friendship } from 'src/app/core/models/Friendship';
import { UserService } from 'src/app/core/services/user/userService.service';
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
      id: null,
    }
  );

  addFriendForm: FormGroup = this.formBuilder.group({
    nickname: new FormControl('', [Validators.required])
  })

  constructor(private formBuilder: FormBuilder, private userRepository: UserRepository, private userService: UserService){
    
  }
  
  
  ngOnInit(): void {
    
  }

  public onSubmit(){
    this.getUserByNickname(this.addFriendForm.value.nickname);

    this.onNewFriend.emit(this.friendship);
  }

  public getUserByNickname(nickname: string){
    this.userService.getUserByNickname(nickname).subscribe({
      next: (resp) => {
        if(resp != null){
          this.friendship.friend = resp;
        }else{ console.log(resp)}
      },
      error: (error) => { console.log(error)}
    })
  }

}
