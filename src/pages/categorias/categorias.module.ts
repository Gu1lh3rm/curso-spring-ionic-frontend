import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriasPage } from './categorias';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaProvider } from '../../providers/categoria/categoria';

@NgModule({
  declarations: [
    CategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriasPage),
    HttpClientModule
  ],
  providers: [
    CategoriaProvider
  ]
})
export class CategoriasPageModule {}
