import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[] = [];
  authenticated = false;
  message = '';
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public categoriaProvider: CategoriaProvider,
    public loadingCtrl: LoadingController,
    private authService: AuthService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let loader = this.presentLoadingDefault();
    this.categoriaProvider.findAll()
    .subscribe(response_items => {
      this.items = response_items;
      loader.dismiss();
    },error => {
      if (error.status == 403) {
        loader.dismiss();
        this.authService.signOut();
      }
    });
  }

  showProdutos(categoria_id : string){
    this.navCtrl.push('ProdutoPage', {categoria_id: categoria_id});
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    loading.present();
    
    return loading;
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete(this.loadData());
    }, 1000);
  }
}
