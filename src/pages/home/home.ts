import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authenticated = false;
  message = '';

  constructor(public navCtrl: NavController, private authService: AuthService, private http: HttpClient, private storage: Storage) {

  }
  ionViewDidEnter() {
    this.authService.refreshToken()
        .subscribe(response => {
          this.authService.successfullLogin(response.headers.get('Authorization'));
        },
        error => {
          this.authService.signOut();
        });
  }
  signOut() {
    this.authService.signOut().then(() => {
      this.navCtrl.setRoot('LoginPage');
    })
    .catch((error) => {
      console.error(error);
    });
  }

}
