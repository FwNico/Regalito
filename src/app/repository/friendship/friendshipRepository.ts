import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Friendship } from "src/app/core/models/Friendship";
import { FriendshipService } from "src/app/core/services/friendship/friendship.service";


@Injectable({
    providedIn: 'root'
})

export class FriendshipRepository{

  constructor(private friendshipService: FriendshipService){

  }

  public getFriends(userId: number | undefined): Promise<Friendship[]> {
    return new Promise<Friendship[]>((resolve, reject) => {
      this.friendshipService.getAllFriendships(userId).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }

  public getFriend(userId: number): Promise<Friendship> {
    return new Promise<Friendship>((resolve, reject) => {
      this.friendshipService.getFriendshipById(userId).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }

  public addFriend(friendship: Friendship): Promise<Friendship> {
    return new Promise<Friendship>((resolve, reject) => {
      this.friendshipService.postFriendship(friendship).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }

  public deleteFriend(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.friendshipService.deleteFriendship(id).subscribe({
        next: bool => resolve(bool),
        error: error => reject(error)
      })
    });
  }

  public async updateFriendship(friendship: Friendship): Promise<Friendship | null> {
    let resp: Friendship | null = null;
    try{
      const apiResponse = this.friendshipService.updateFriendship(friendship);
      resp = await lastValueFrom(apiResponse);
    }catch(error){
      throw error;
    }
    return resp;
  }

}