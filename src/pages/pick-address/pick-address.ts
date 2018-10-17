import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthService } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageProvider, 
    public clienteProvider: ClienteProvider) {
  }

  ionViewDidLoad() {
    console.log("teste");
    let localUser = this.storage.getLocalUser();
    console.log(localUser);
    console.log(localUser.email);
    if (localUser && localUser.email) {
      this.clienteProvider.findByEmail(localUser.email)
      .subscribe(response => {
        console.log(response);
        this.items = response['enderecos'];
        
      }, error => {
        console.log(error);
      });
    }
  }

}
