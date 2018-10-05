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
    private authService: AuthService
    ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = 'HomePage';
      } else {
        this.rootPage = 'LoginPage';
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
    this.pages = [
      { title: 'Sair' }
    ];

  }

  openPage(page) {
    if (page.title == 'Sair'){
      this.authService.signOut();
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


// export class MyApp {
//   @ViewChild(Nav) nav: Nav;

//   rootPage: any;

//   pages: Array<{title: string, component: string}>;

//   constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, afAuth: AngularFireAuth) {
//     const authObserver = afAuth.authState.subscribe(user => {
//       alert(user);
//       if (user) {
//         this.rootPage = 'LoginPage';
//         authObserver.unsubscribe();
//       } else {
//         this.rootPage = 'HomePage';
//         authObserver.unsubscribe();
//       }
//     })
    /*
      Comentado pois está sendo feita uma verificação de usuário logado no firebase
      this.initializeApp();
    */


    // used for an example of ngFor and navigation
  //   this.pages = [
  //     { title: 'Login', component: 'LoginPage' }
  //   ];

  // }

//   initializeApp() {
//     this.platform.ready().then(() => {
//       // Okay, so the platform is ready and our plugins are available.
//       // Here you can do any higher level native things you might need.
//       this.statusBar.styleDefault();
//       this.splashScreen.hide();
//     });
//   }

//   openPage(page) {
//     // Reset the content nav to have just this page
//     // we wouldn't want the back button to show in this scenario
//     this.nav.setRoot(page.component);
//   }
// }
