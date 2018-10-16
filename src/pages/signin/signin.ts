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
    this.authService.authenticate(this.user)
    .subscribe(response => {
      this.authService.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('HomePage');
    },
    error => {
      this.authService.signOut();
    });
  }
}
