import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  storageKey: string = 'forum-manager-jwt';
  username: string = 'username';
  checkUsername: string;  
  userType: string = 'admin';  
  _id: string = '_id';
  

  constructor(private router: Router) { }

  setToken(token: string, admin: boolean, username: string, _id: string) {
    localStorage.setItem(this.storageKey, token);
    localStorage.setItem(this.userType, admin.toString());        
    localStorage.setItem(this.username, username);
    localStorage.setItem(this._id, _id);
  }

  /////////////////// Retrieve from local storage ///////////////////

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  getUsername() {
    return localStorage.getItem(this.username);
  }

  getID() {
    return localStorage.getItem(this._id);
  }

  getAdmin() {
    return localStorage.getItem(this.userType);
  }
    
  isAdmin() {
    var isAdmin = false;
    if(this.getAdmin() === "true"){
      isAdmin = true;
    }
    return isAdmin;
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  isLoggedOut() {
    return this.getToken() == null;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.username);
    this.router.navigate(['/login']);
  }

}
