import {Component} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService) { }
  title = 'helper-angular';
  usernameEnc: any;
  passwordEnc: any;

  onSubmit(): void {
    const { username, password } = this.form;
    const res = this.authService.login(username, password);
    this.usernameEnc = res.usernameEncrypted;
    this.passwordEnc = res.passwordEncrypted;
  }
}
