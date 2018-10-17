import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartProvider } from '../../providers/cart/cart';
import { ProdutoDTO } from '../../providers/produto/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider: CartProvider) {
  }

  ionViewDidLoad() {
    let cart = this.cartProvider.getCart();
    this.items = cart.items;
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartProvider.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartProvider.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartProvider.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartProvider.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
