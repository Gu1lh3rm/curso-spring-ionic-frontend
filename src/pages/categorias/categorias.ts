import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CategoriaProvider } from '../../providers/categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public categoriaProvider: CategoriaProvider) {
  }

  ionViewDidLoad() {

    this.categoriaProvider.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }
}
