import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
      this.authService.authState.subscribe(res => {
        console.log("authStatus: ", res)
      })
  }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onLogin(event: Event): any {
    event.preventDefault()

    if(this.form.valid) {
      let { email, password } = this.form.value

      this.authService.logIn(email, password)
      .then(res => {
        console.log(res)
        this.router.navigateByUrl("item/add", { replaceUrl: true })
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
