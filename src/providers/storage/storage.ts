import { Injectable } from '@angular/core';
import { LocalUser } from '../../models/local_user';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { Cart } from '../../models/cart';
import { CategoriaSelected } from '../../models/categoria-selected';
import { ProdutoSelected } from '../../models/produto-selected';
import { PedidoDTO } from '../../models/pedido.dto';

@Injectable()
export class StorageProvider {

  getLocalUser() : LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    }
    else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj : LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCart() : Cart {
    let str = localStorage.getItem(STORAGE_KEYS.cart + this.getLocalUser().email);
    if (str != null) {
        return JSON.parse(str);
    }
    else {
        return null;
    }
  }

  setCart(obj : Cart) {
      if (obj != null) {
          localStorage.setItem(STORAGE_KEYS.cart + this.getLocalUser().email, JSON.stringify(obj));
      } 
      else {
          localStorage.removeItem(STORAGE_KEYS.cart + this.getLocalUser().email);
      }
  }
  
  getCategoriaSelected() : CategoriaSelected {
    let cats = localStorage.getItem(STORAGE_KEYS.categoriaSelected + this.getLocalUser().email);
    if (cats == null) {
      return null;
    }
    else {
      return JSON.parse(cats);
    }
  }

  setCategoriaSelected(cats : CategoriaSelected) {
    if (cats == null) {
      localStorage.removeItem(STORAGE_KEYS.categoriaSelected + this.getLocalUser().email);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.categoriaSelected + this.getLocalUser().email, JSON.stringify(cats));
    }
  }

  getProdutoSelected() : ProdutoSelected {
    let prod = localStorage.getItem(STORAGE_KEYS.produtoSelected + this.getLocalUser().email);
    if (prod == null) {
      return null;
    }
    else {
      return JSON.parse(prod);
    }
  }

  setProdutoSelected(prod : ProdutoSelected) {
    if (prod == null) {
      localStorage.removeItem(STORAGE_KEYS.produtoSelected + this.getLocalUser().email);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.produtoSelected + this.getLocalUser().email, JSON.stringify(prod));
    }
  }

  getPedidoSelected() : PedidoDTO {
    let ped = localStorage.getItem(STORAGE_KEYS.pedidoSelected + this.getLocalUser().email);
    if (ped == null) {
      return null;
    }
    else {
      return JSON.parse(ped);
    }
  }

  setPedidoSelected(ped : PedidoDTO) {
    if (ped == null) {
      localStorage.removeItem(STORAGE_KEYS.pedidoSelected + this.getLocalUser().email);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.pedidoSelected + this.getLocalUser().email, JSON.stringify(ped));
    }
  }

}
