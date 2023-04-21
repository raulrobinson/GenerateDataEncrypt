import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

/* Llave Publica Suministrada para Authentication-Resource-Management */
const publicKeyPem = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPP+NlfOS/cYdJ1dkbg3EMGY/8JJgl\n' +
  '2Op89RNUIB6zJ8O3vD1dwmR4f/zIYx9tOOMgMxm3LmlhoF2LoYuC0mUuPcnXbgY2VPVY\n' +
  'WC73DE82Ejn31YDGz79K9ufmPiyT6Sxnx6V0PQFJIQf1SMQaSoaKdUe9BSIn0ODKC1Xi\n' +
  'BJBefwIDAQAB' +
  '-----END PUBLIC KEY-----';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* LEEMOS LA LLAVE PUBLICA */
  publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  data: string[] = [];

  constructor() { }

  login(username: string, password: string): { usernameEncrypted: string; passwordEncrypted: string } {
    const usernameEncrypted = this.generateUsername(username);
    const passwordEncrypted = this.generatePassword(password);
    return {usernameEncrypted, passwordEncrypted};
  }

  generateUsername(username: string): string {

    /* Encriptar el USERNAME utilizando la clave pública RSA y el algoritmo RSA/None/OAEPWithSHA-1AndMGF1Padding */
    const encryptedUsername = this.publicKey.encrypt(username, 'RSA-OAEP', {
      md: forge.md.sha1.create(),
      mgf1: {
        md: forge.md.sha1.create()
      }
    });

    /* Codificamos a Base64 el USERNAME */
    const base64EncryptedUsername = forge.util.encode64(encryptedUsername);
    console.log('Username encrypted: ', base64EncryptedUsername);

    return base64EncryptedUsername;
  }

  generatePassword(password: string): string {

    /* Encriptar el PASSWORD utilizando la clave pública RSA y el algoritmo RSA/None/OAEPWithSHA-1AndMGF1Padding */
    const encryptedPassword = this.publicKey.encrypt(password, 'RSA-OAEP', {
      md: forge.md.sha1.create(),
      mgf1: {
        md: forge.md.sha1.create()
      }
    });

    /* Codificamos a Base64 el PASSWORD */
    const base64EncryptedPassword = forge.util.encode64(encryptedPassword);
    console.log('Password encrypted: ', base64EncryptedPassword);

    return base64EncryptedPassword;

  }
}
