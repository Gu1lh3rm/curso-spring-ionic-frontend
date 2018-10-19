import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { MyApp } from './app.component';

import { AuthService } from '../providers/auth/auth-service';
import { CategoriaProvider } from '../providers/categoria/categoria';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorProvider } from '../providers/interceptor/error-interceptor';
import { StorageProvider } from '../providers/storage/storage';
import { ClienteProvider } from '../providers/cliente/cliente';
import { AuthInterceptorProvider } from '../providers/interceptor/auth-interceptor';
import { CidadeProvider } from '../providers/cidade/cidade';
import { EstadoProvider } from '../providers/estado/estado';
import { ProdutoProvider } from '../providers/produto/produto';
import { CartProvider } from '../providers/cart/cart';
import { PedidoProvider } from '../providers/pedido/pedido';
import { FIREBASE_CONFIG } from '../config/firebase.config';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CategoriaProvider,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorProvider, multi: true },
    StorageProvider,
    ClienteProvider,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    CidadeProvider,
    EstadoProvider,
    ProdutoProvider,
    CartProvider,
    PedidoProvider  
  ]
})
export class AppModule {}
