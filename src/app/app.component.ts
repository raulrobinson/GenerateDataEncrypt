import {Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeResult: string = '';

  form: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService, private modalService: NgbModal) { }
  title = 'helper-angular';
  usernameEnc: any;
  passwordEnc: any;

  onSubmit(): void {
    const { username, password } = this.form;
    const res = this.authService.login(username, password);
    this.usernameEnc = res.usernameEncrypted;
    this.passwordEnc = res.passwordEncrypted;
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onCopy(event: ClipboardEvent) {
    event.preventDefault();
    if (event.clipboardData) {
      // @ts-ignore
      event.clipboardData.setData('text/plain', window.getSelection()?.toString());
    }
  }

  copyToClipboard(text: string) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }
}
