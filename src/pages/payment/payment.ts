import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;

  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10];

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: StorageProvider) {
 
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });

  }

  ionViewDidLoad() {
    
    this.pedido = this.navParams.get('pedido');

    let pedido_selected : PedidoDTO = this.pedido;

    if(pedido_selected) {
      this.storage.setPedidoSelected(pedido_selected);
    } else{
      this.pedido = this.storage.getPedidoSelected();
    }
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }

}
