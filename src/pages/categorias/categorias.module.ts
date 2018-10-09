import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriasPage } from './categorias';
import { CategoriaProvider } from '../../providers/categoria/categoria';

@NgModule({
  declarations: [
    CategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriasPage)
  ],
  providers: [
    CategoriaProvider
  ]
})
export class CategoriasPageModule {}
