import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authService: AuthService) {

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
