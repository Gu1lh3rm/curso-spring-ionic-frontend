import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public authService: AuthService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  public login(){
    this.navCtrl.setRoot('HomePage');
  }

  public signup(){
    this.navCtrl.push('SignupPage');
  }

  public signin(){
    this.navCtrl.push('SigninPage');
  }

}
