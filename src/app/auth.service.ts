import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // loginUrl = 'http://127.0.0.1:8000/login/' // For dev
  loginUrl = 'http://16.171.52.31/login/' // For prod


  loginUser(body: any) {
    return this.httpClient.post(this.loginUrl, body)
  }
}
