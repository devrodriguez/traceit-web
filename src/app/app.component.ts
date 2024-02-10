import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'traceit-web';
  loggedIn: boolean = false

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authService.authState.subscribe(res => {
      console.log('authState from app root', res)
      if(res) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    })
  }

  onLogOut() {
    this.authService.logOut()
    .then(res => {
      this.router.navigateByUrl('auth/login', { replaceUrl: true })
    })
    .catch(err => {
      console.error(err)
    })
  }
}
