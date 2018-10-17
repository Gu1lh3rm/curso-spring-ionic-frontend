import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageProvider, 
    public clienteProvider: ClienteProvider,
    private authService: AuthService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteProvider.findByEmail(localUser.email)
      .subscribe(response => {
        
        this.cliente = response;
        
      }, error => {
        if (error.status == 403) {
          this.authService.signOut();
        }
      });
    }
  }

}
