import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartProvider } from '../../providers/cart/cart';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItem: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public cartProvider: CartProvider, public clienteProvider: ClienteProvider) {
  }

  ionViewDidLoad() {
    this.pedido = this.navParams.get('pedido');
    
    this.cartItem = this.cartProvider.getCart().items;
    

    if(this.pedido) {
      this.storage.setPedidoSelected(this.pedido);
    } else {
      this.pedido = this.storage.getPedidoSelected();
    }
    this.clienteProvider.findByIdCliente(this.pedido.cliente.id)
    .subscribe(cliente_response => {
      this.cliente = cliente_response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, cliente_response['enderecos']);
    }, error => {
      this.navCtrl.setRoot('LoginPage');
    })
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartProvider.total();
  }

}
