import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../providers/produto/produto.dto';
import { AuthService } from '../../providers/auth/auth-service';
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoProvider: ProdutoProvider,
    private authService: AuthService) {
  }

  ionViewDidLoad() {
    
    let produto_id = this.navParams.get('produto_id');
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

}
