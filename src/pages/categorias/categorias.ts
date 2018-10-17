import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

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
    public categoriaProvider: CategoriaProvider) {
  }

  ionViewDidLoad() {

    this.categoriaProvider.findAll()
    .subscribe(response_items => {
      this.items = response_items;
    },error => {//Log de erro está no interceptor 
    });
  }

  showProdutos(categoria_id : string){
    this.navCtrl.push('ProdutoPage', {categoria_id: categoria_id});
  }
}
