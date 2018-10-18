import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { StorageProvider } from '../../providers/storage/storage';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageProvider, 
    public clienteProvider: ClienteProvider,
    public cartProvider: CartProvider) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteProvider.findByEmail(localUser.email)
      .subscribe(response => {
        this.items = response['enderecos'];
        
        let cart = this.cartProvider.getCart();
        
        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
        }    
      }, error => {
        console.log(error);
      });
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }

}
