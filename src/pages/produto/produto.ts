import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../providers/produto/produto.dto';
import { ProdutoProvider } from '../../providers/produto/produto';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../providers/auth/auth-service';
import { StorageProvider } from '../../providers/storage/storage';
import { CategoriaSelected } from '../../models/categoria-selected';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: ProdutoDTO[];
  categoriaSelected: CategoriaSelected;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoProvider: ProdutoProvider,
    private authService: AuthService, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');

    let categoria_selected : CategoriaSelected = {
      id: categoria_id
    };

    if(categoria_id){
      this.storage.setCategoriaSelected(categoria_selected);
      
    } else {
      categoria_id = this.storage.getCategoriaSelected().id;
    }

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
