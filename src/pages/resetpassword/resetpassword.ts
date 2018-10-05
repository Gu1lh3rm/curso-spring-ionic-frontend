import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  user: User = new User();
  @ViewChild('form') from: NgForm;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, private toastCtrl: ToastController) {
  }
  resetPassword(){
    if (this.from.form.valid) {

      let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
      this.authService.resetPassword(this.user.email)
      .then(() => {
        toast.setMessage('Solicitação foi enviada para o seu e-mail');
        toast.present();
        this.navCtrl.pop();
      })
      .catch((error: any) => {
        if (error.code == 'auth/invalid-email'){
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/user-not-found') {
          toast.setMessage('O usuário não foi encontrado.');
        }
      });
    }
  }


}
