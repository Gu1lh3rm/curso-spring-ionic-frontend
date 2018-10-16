import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../providers/produto/produto..dto';
import { ProdutoProvider } from '../../providers/produto/produto';

/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoProvider: ProdutoProvider) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');

    this.produtoProvider.findByCategoria( categoria_id )
    .subscribe(categoria_response => {
      this.items = categoria_response['content'];
    }, error => {});

    // this.items = [
    //   {
    //     id: "1",
    //     nome: "Mouse",
    //     preco: 80.99
    //   },
    //   {
    //     id: "2",
    //     nome: 'Teclado',
    //     preco: 100.00
    //   }
    // ]
  }

}
