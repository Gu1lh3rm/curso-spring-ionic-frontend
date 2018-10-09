import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth/auth-service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  
  pages: Array<{title: string, component?: string}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    afAuth: AngularFireAuth,
    private authService: AuthService) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = 'HomePage';
      } else {
        this.rootPage = 'LoginPage';
      }
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Sair' }
    ];

  }

  openPage(page) {
    if (page.title == 'Sair'){
      this.authService.signOut();
    } else {
      this.nav.setRoot(page.component);
    }
  }
 
  signOut() {
    this.authService.signOut().then(() => {
      this.rootPage = 'LoginPage'; // Método não é necessário pois o afAuth.authState.subscribe faz a verificação de usuário logado
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
