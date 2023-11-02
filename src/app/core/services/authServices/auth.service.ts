import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRespone } from '../../interfaces';
import { User } from '../../models';
import { ApiService } from '../api.service';
import { Observable, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null | undefined = null;

  constructor(private apiService: ApiService) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  public async login(email: string, password: string): Promise<boolean> {

    let isLogin = false;

    
    return isLogin;
  }

  public logout(){
    this.user = undefined;
    localStorage.clear();
  }

  public checkAuthentication(): boolean{
    return localStorage.getItem('token') ? true : false;
  }

}