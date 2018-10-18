import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartProvider } from '../../providers/cart/cart';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { AuthService } from '../../providers/auth/auth-service';

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
  codpedido: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageProvider, 
    public cartProvider: CartProvider, 
    public clienteProvider: ClienteProvider,
    public pedidoProvider: PedidoProvider,
    public authService: AuthService) {
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

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.pedidoProvider.insertPedido(this.pedido)
    .subscribe(pedido_response => {
      this.cartProvider.createOrClearCart();
      this.codpedido = this.extractId(pedido_response.headers.get('location'));
    }, error => {
      if(error.status == 403) {
        this.authService.signOut();
      }
    }
    )
  }

  private extractId(location: string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
