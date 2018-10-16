import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { CidadeProvider } from '../../providers/cidade/cidade';
import { EstadoProvider } from '../../providers/estado/estado';
import { EstadoDTO } from '../../providers/estado/estado.dto';
import { CidadeDTO } from '../../providers/cidade/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user: User = new User();
  @ViewChild('form') from: NgForm;
  formGroup: FormGroup;

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public cidadeProvider: CidadeProvider,
    public estadoProvider: EstadoProvider) {

      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoProvider.findAll()
    .subscribe(response_estados => {
      this.estados = response_estados;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, error => {});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeProvider.findAll(estado_id)
    .subscribe(cidade_response => {
      this.cidades = cidade_response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => {});
  }

  signup(){
    console.log("Teste signup");
  }

  signupUser() {
    console.log("enviou o form");
  }

  createAccount(){
    if (this.from.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authService.createUser(this.user)
        .then((user: any) => {
          toast.setMessage('Usuário criado com sucesso.');
          toast.present();
          
          this.navCtrl.setRoot('HomePage');
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();
  
      });
    }
  }

}

