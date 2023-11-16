import { IFriendship } from "../interfaces/IFriendship";
import { User } from "./User"

export class Friendship implements IFriendship{
    id: number | null;
    userId: number | null;
    friend: User;

    constructor(friendship?: any){
        this.id = friendship.id != null ? friendship.id : null;
        this.userId = friendship.userId != null ? friendship.userId : null;
        this.friend = friendship.friend;
    }

}