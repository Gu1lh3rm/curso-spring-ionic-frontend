import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../providers/produto/produto.dto';
import { ProdutoProvider } from '../../providers/produto/produto';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoProvider: ProdutoProvider,
    private authService: AuthService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');

    this.produtoProvider.findByCategoria( categoria_id )
    .subscribe(categoria_response => {
      this.items = categoria_response['content'];
      
    }, error => {
      if (error.status == 403) {
        this.authService.signOut();
      }
    });
  }

  showProdutosDetail(produto_id : number) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

}
