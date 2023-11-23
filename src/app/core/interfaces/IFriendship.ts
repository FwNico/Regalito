import { User } from "../models/User";

export interface IFriendship{
    id: number| null;
    userId: number | null;
    status: string;
    friend: User;
  }