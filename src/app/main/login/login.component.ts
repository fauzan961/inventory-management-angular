import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).pipe(
        catchError(error => {
          if (error.status === 400) {
            alert('Invalid Username or Password!')
          }
          else {
            alert('Something went wrong!')
          }
          return of(null);
        })
      ).subscribe(
        (result: any) => {
          if (result != null) {
            this.cookieService.set('mr-token', result.token)
            this.router.navigate(['/home'])
          }
        }
      )
    }
  }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token')
    if (mrToken) {
      this.router.navigate(['/home'])
    }
  }

}
