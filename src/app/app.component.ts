import {Component, OnInit} from '@angular/core';
import * as forge from 'node-forge';
import {AuthService} from "./auth.service";

/* Llave Publica Suministrada para Authentication-Resource-Management */
const publicKeyPem = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPP+NlfOS/cYdJ1dkbg3EMGY/8JJgl\n' +
  '2Op89RNUIB6zJ8O3vD1dwmR4f/zIYx9tOOMgMxm3LmlhoF2LoYuC0mUuPcnXbgY2VPVY\n' +
  'WC73DE82Ejn31YDGz79K9ufmPiyT6Sxnx6V0PQFJIQf1SMQaSoaKdUe9BSIn0ODKC1Xi\n' +
  'BJBefwIDAQAB' +
  '-----END PUBLIC KEY-----';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService) { }
  title = 'helper-angular';
  content: any;
  usernameEnc: any;
  passwordEnc: any;

  ngOnInit(): void {

    // /* LEEMOS LA LLAVE PUBLICA */
    // const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    //
    // /* USERNAME a Encryptar */
    // const username = 'rrbolivarna';
    //
    // /* PASSWORD a Encryptar */
    // const password = 'Rjbp20233*';
    //
    // /* Encriptar el USERNAME utilizando la clave pública RSA y el algoritmo RSA/None/OAEPWithSHA-1AndMGF1Padding */
    // const encryptedUsername = publicKey.encrypt(username, 'RSA-OAEP', {
    //   md: forge.md.sha1.create(),
    //   mgf1: {
    //     md: forge.md.sha1.create()
    //   }
    // });
    //
    // /* Encriptar el PASSWORD utilizando la clave pública RSA y el algoritmo RSA/None/OAEPWithSHA-1AndMGF1Padding */
    // const encryptedPassword = publicKey.encrypt(password, 'RSA-OAEP', {
    //   md: forge.md.sha1.create(),
    //   mgf1: {
    //     md: forge.md.sha1.create()
    //   }
    // });
    //
    // /* Codificamos a Base64 el USERNAME */
    // const base64EncryptedUsername = forge.util.encode64(encryptedUsername);
    //
    // /* Codificamos a Base64 el PASSWORD */
    // const base64EncryptedPassword = forge.util.encode64(encryptedPassword);
    //
    // console.log('Username encrypted: ', base64EncryptedUsername);
    // console.log('Password encrypted: ', base64EncryptedPassword);

  }

  onSubmit(): void {
    const { username, password } = this.form;
    const res = this.authService.login(username, password);
    this.usernameEnc = res.usernameEncrypted;
    this.passwordEnc = res.passwordEncrypted;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
