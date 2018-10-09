import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: User = new User();
  @ViewChild('form') from: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private authService: AuthService) {
  }

  public signUp(){
    this.navCtrl.setRoot('SignupPage');
  }

  public resetPassword() {
    this.navCtrl.push('ResetpasswordPage');
  }

  signIn() {
    if (this.from.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authService.signIn(this.user)
      .then((response_firebase) => {
        console.log(response_firebase);
        this.authService.authenticate(this.user)
        .subscribe(response => {
          console.log(response.headers.get('Authorization'));
          this.navCtrl.setRoot('HomePage');
        },
        error => {
          this.authService.signOut();
        });
        
      })
      .catch((error: any) => {
        if (error.code  == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado é invalido.');
        } else if (error.code  == 'auth/user-disabled') {
          toast.setMessage('O e-mail digitado está desabilitado.');
        } else if (error.code  == 'auth/user-not-found') {
          toast.setMessage('O e-mail digitado não foi encontrado.');
        } else if (error.code  == 'auth/wrong-password') {
          toast.setMessage('A senha digitada é inválida.');
        }
        toast.present();
      });
    }
  }
  
}
