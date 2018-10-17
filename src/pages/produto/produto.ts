import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../providers/produto/produto..dto';
import { ProdutoProvider } from '../../providers/produto/produto';
import { API_CONFIG } from '../../config/api.config';

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
  
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoProvider: ProdutoProvider) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');

    this.produtoProvider.findByCategoria( categoria_id )
    .subscribe(categoria_response => {
      this.items = categoria_response['content'];
      
      this.items.forEach(function(item) {
        console.log(item.imgUrl);
        console.log(item.imgSmallUrl);
      })
      this.items[0].imgSmallUrl

    }, error => {});
  }

}
