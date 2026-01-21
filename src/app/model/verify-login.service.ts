import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export type VerifyLoginType = {
  isAuthenticated: boolean,
  username: string,
  message: string,
  token: number,
  error: string | null
}

@Injectable({
  providedIn: 'root',
})
export class VerifyLoginService {
  private http = inject(HttpClient)

  async verifyPromise(username: string, password: string): Promise<string> {
    const url = 'https://lbndc5iqd2.execute-api.us-east-1.amazonaws.com/prod/login';
    const body = JSON.stringify({ "username": username, "password": password })
    
    const postRequestObservable = this.http.post<string>(url, body);
    return lastValueFrom(postRequestObservable)
  }
}
