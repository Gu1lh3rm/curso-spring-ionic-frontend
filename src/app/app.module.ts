import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth/auth-service';

const firebaseConfig = {
  apiKey: "AIzaSyBZFHkdEuyiOV_TIwaZKXCKfFZroZ1rIPo",
  authDomain: "gml-curso-spring-ionic-front.firebaseapp.com",
  databaseURL: "https://gml-curso-spring-ionic-front.firebaseio.com",
  projectId: "gml-curso-spring-ionic-front",
  storageBucket: "gml-curso-spring-ionic-front.appspot.com",
  messagingSenderId: "626264654919"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
