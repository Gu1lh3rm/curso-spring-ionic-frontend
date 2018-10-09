import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { CategoriaDTO } from '../../providers/categoria/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

import { AuthService } from '../../providers/auth/auth-service';
import { Storage } from '@ionic/storage';

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
    private authService: AuthService, 
    private storage: Storage) {
  }

  ionViewDidLoad() {

    this.categoriaProvider.findAll()
    .subscribe(response_items => {
      this.items = response_items;
    },error => {//Log de erro está no interceptor 
    });
  }

}


/*
ionViewDidLoad() {

    this.categoriaProvider.findAll()
    .subscribe(response_items => {
      console.log(response_items);
      this.items = response_items;
      
      Método pega o token direto do site e cria um objeto lista
      response_items.forEach(response_item => {

        this.categoriaProvider.findAllBucketUrl("cat", response_item.id)
        .subscribe(response_firebase => {

          response_item.img_url = response_firebase.name + '?alt=media&token=' + response_firebase.downloadTokens;
          
          this.items.push({id: response_item.id, nome: response_item.nome, img_url: response_item.img_url});

        }, error => {
          console.log(error);
        });      
        
      });
    
  }
  ,
  error => {
    console.log(error);
  });
}
*/