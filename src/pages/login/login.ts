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

  ionViewDidEnter() {
    console.log("teste ionViewdidEnter");
          //console.log(response);
    this.authService.refreshToken()
        .subscribe(response => {
          this.authService.successfullLogin(response.headers.get('Authorization'));
        },
        error => {
          this.authService.signOut();
        });
  }

  public login(){
    this.navCtrl.setRoot('HomePage');
  }

  public signup(){
    this.navCtrl.setRoot('SignupPage');
  }

  public signin(){
    this.navCtrl.setRoot('SigninPage');
  }

}
