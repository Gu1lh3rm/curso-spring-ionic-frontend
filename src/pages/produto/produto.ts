import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  items: ProdutoDTO[] = [];
  categoriaSelected: CategoriaSelected;

  page: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoProvider: ProdutoProvider,
    private authService: AuthService, public storage: StorageProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');

    let loader = this.presentLoadingDefault();

    let categoria_selected : CategoriaSelected = {
      id: categoria_id
    };

    if(categoria_id){
      this.storage.setCategoriaSelected(categoria_selected);
      
    } else {
      categoria_id = this.storage.getCategoriaSelected().id;
    }
    
  this.produtoProvider.findByCategoria( categoria_id, this.page, 10 )
    .subscribe(categoria_response => {
      this.items = this.items.concat(categoria_response['content']);
      loader.dismiss();
      console.log(this.page);
      console.log(this.items);
    }, error => {
      if (error.status == 403) {
        loader.dismiss();
        this.authService.signOut();
      }
    });
  }

  showProdutosDetail(produto_id : number) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    loading.present();
    
    return loading;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    setTimeout(() => {
      refresher.complete(this.loadData());
    }, 10);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 10);
  }

}
