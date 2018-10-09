import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public clienteProvider: ClienteProvider) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteProvider.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
        //buscar imagem
      }, error => {});
    }
  }

}
