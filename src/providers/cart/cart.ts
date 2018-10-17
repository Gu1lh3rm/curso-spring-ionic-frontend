import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../produto/produto.dto';


@Injectable()
export class CartProvider {

  constructor(public storage: StorageProvider) {
  }

  createOrClearCart() : Cart {
    let cart: Cart = {items: []};
    this.storage.setCart(cart);
    return cart;
  }

  getCart() : Cart {
    let cart: Cart = this.storage.getCart();
    if (cart == null) {
        cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO) : Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position == -1) {
        cart.items.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(cart);
    return cart;
  }


}
