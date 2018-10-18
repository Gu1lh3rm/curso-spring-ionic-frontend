import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../providers/produto/produto.dto';
import { AuthService } from '../../providers/auth/auth-service';
import { ProdutoProvider } from '../../providers/produto/produto';
import { CartProvider } from '../../providers/cart/cart';
import { ProdutoSelected } from '../../models/produto-selected';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoProvider: ProdutoProvider,
    private authService: AuthService, public cartProvider: CartProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    
    let produto_id = this.navParams.get('produto_id');

    let produto_selected : ProdutoSelected = {
      id : produto_id
    }

    if(produto_id) {
      this.storage.setProdutoSelected(produto_selected);
    } else {
      produto_id = this.storage.getProdutoSelected().id;
    }

    this.produtoProvider.findProdutoById(produto_id)
      .subscribe(response => {
        this.item = response;
      },
      error => {
        if (error.status == 403) {
          this.authService.signOut();
        }
      });
  }

  addToCart(produto: ProdutoDTO) {
    this.cartProvider.addProduto(produto);
    this.navCtrl.push('CartPage');
  }

}
