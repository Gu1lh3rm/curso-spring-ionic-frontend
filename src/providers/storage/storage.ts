import { Injectable } from '@angular/core';
import { LocalUser } from '../../models/local_user';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { Cart } from '../../models/cart';
import { CategoriaSelected } from '../../models/categoria-selected';
import { ProdutoSelected } from '../../models/produto-selected';

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
    let str = localStorage.getItem(STORAGE_KEYS.cart);
    if (str != null) {
        return JSON.parse(str);
    }
    else {
        return null;
    }
  }

  setCart(obj : Cart) {
      if (obj != null) {
          localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
      } 
      else {
          localStorage.removeItem(STORAGE_KEYS.cart);
      }
  }
  
  getCategoriaSelected() : CategoriaSelected {
    let cats = localStorage.getItem(STORAGE_KEYS.categoriaSelected);
    if (cats == null) {
      return null;
    }
    else {
      return JSON.parse(cats);
    }
  }

  setCategoriaSelected(cats : CategoriaSelected) {
    if (cats == null) {
      localStorage.removeItem(STORAGE_KEYS.categoriaSelected);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.categoriaSelected, JSON.stringify(cats));
    }
  }

  getProdutoSelected() : ProdutoSelected {
    let prod = localStorage.getItem(STORAGE_KEYS.produtoSelected);
    if (prod == null) {
      return null;
    }
    else {
      return JSON.parse(prod);
    }
  }

  setProdutoSelected(prod : ProdutoSelected) {
    if (prod == null) {
      localStorage.removeItem(STORAGE_KEYS.produtoSelected);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.produtoSelected, JSON.stringify(prod));
    }
  }

}
