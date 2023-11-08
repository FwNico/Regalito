import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models';
import { Observable, catchError, map, of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private baseURL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  //devuelven observables para que los trabaje user service

  public getUserById(id:number): Observable<User | null> {

    return this.http.get<User>(`${this.baseURL}/users/${id}`).pipe(
      map(user => user),
      catchError(error => of(null))
    );
  }

  public addUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseURL}/users`, user);
  }

  public deleteUser(id: number): Observable<boolean> {
      return this.http.delete(`${this.baseURL}/users/${id}`).pipe(
          map(resp => true),
          catchError(error => of(false))
      );
  }

}
