import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeProvider } from '../../providers/cidade/cidade';
import { EstadoProvider } from '../../providers/estado/estado';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    CidadeProvider,
    EstadoProvider
  ]
})
export class SignupPageModule {}
