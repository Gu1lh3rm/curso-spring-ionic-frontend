import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { StorageProvider } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public authService: AuthService,
    public storage: StorageProvider) {
  }

  ionViewDidEnter() {
    if(this.storage.getLocalUser()) {
      this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfullLogin(response.headers.get('Authorization'));
        this.login();
      },
      error => {
        this.authService.signOut();
      });
    }    
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
