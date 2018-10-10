import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public clienteProvider: ClienteProvider) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteProvider.findByEmail(localUser.email)
      .subscribe(response => {
        if(response.imgUrl){
          response.imgUrl = this.bucketUrl + response.imgUrl;
        } else{
          response.imgUrl = 'assets/imgs/avatar-blank.png'
        }
        this.cliente = response;
        
      }, error => {});
    }
  }

}
