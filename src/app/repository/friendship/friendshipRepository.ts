import { Injectable } from "@angular/core";
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

}