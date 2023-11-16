import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Friendship } from '../../models/Friendship';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  private baseURL = "http://localhost:3000/friendships"

  constructor(private http: HttpClient) { }

  getAllFriendships(): Observable <Friendship[]>{
    return this.http.get<Friendship[]>(`${this.baseURL}?_sort=friend.nickname&_order=asc`);
  }

  getFriendshipById(id: number): Observable <Friendship>{
    return this.http.get<Friendship>(`${this.baseURL}/${id}`);
  }

  postFriendship(friendship: Friendship): Observable<Friendship>{
    return this.http.post<Friendship>(this.baseURL, friendship, {headers: {'Content-type':'application/json'}});
  }

  /* deleteFriendship(id:number | undefined){
    return this.http.delete(`${this.baseURL}/${id}`);
  } */

  public deleteFriendship(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

}
