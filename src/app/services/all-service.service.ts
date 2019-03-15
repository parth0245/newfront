import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { MessageModalComponent } from '../modals/message-modal/message-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AllServiceService {
  private authStatus = false;
  private isAuthenticated = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  private customerId: string = '';
  constructor(private http: HttpClient, private loaderService: LoaderService, private router: Router, private dialogService: DialogService) { }
  getToken() {
    return this.token;
  }
  getAuthStatus() {
    return this.authStatus;
  }
  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }
  registerUser(email: string, name: string, mobile: string, password: string) {
    const userRegisterData = {
      email: email,
      password: password,
      name: name,
      mobile: mobile
    }
    return this.http.post('http://172.16.3.250:3000/api/user/register', userRegisterData);
  }

  login(email: string, password: string,redirect:boolean) {
    this.loaderService.display(true);
    const userRegisterData = {
      email: email,
      password: password,
    }
    return this.http.post<{ token: string, expiresIn: number, email: string }>('http://172.16.3.250:3000/api/user/login', userRegisterData).subscribe(token => {
      this.token = token.token;
      if (this.token) {
        const expriresInDuration = token.expiresIn;
        this.customerId = token.email;
        this.setAuthTimer(expriresInDuration);
        this.authStatus = true;
        this.isAuthenticated.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expriresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate , this.customerId);
        if(redirect){
          this.router.navigate(['/dashboard/home']);
        }
        
        this.loaderService.display(false);
      }
    }, (err) => {
      // console.log(err);
      this.showErrorPopup('Login Failed', err);
      this.loaderService.display(false);
    });
  }

  logout() {
    this.token = null;
    this.authStatus = false;
    this.isAuthenticated.next(false);
    clearInterval(this.tokenTimer);
    this.clearAuthData();
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token
      this.authStatus = true;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, email:string) {
    localStorage.setItem('token', token);//to be removed later
    localStorage.setItem('date', expirationDate.toISOString());//to be removed later
    localStorage.setItem('id', email);//to be removed later
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("date");
    localStorage.removeItem("id");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("date");
    const id = localStorage.getItem("id");

    if (!token || !expirationDate || !id) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      id:id
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  showErrorPopup(title, message) {
    let disposable = this.dialogService.addDialog(MessageModalComponent, {
      title: title,
      message: message.error.message
    })
      .subscribe((isConfirmed) => {   });

  }

  getUserData() {
    return this.http.post('http://172.16.3.250:3000/api/user/getUserData', {
      email: localStorage.getItem("id")
    });
}

getUserNameByID(id) {
  return this.http.post('http://172.16.3.250:3000/api/user/getUserName', {
    email: id
  });
}



}
