import { AlertController } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { StorageProvider } from '../storage/storage';
import { AuthService } from '../auth/auth-service';
 
@Injectable()
export class ErrorInterceptorProvider implements HttpInterceptor {
 
    constructor(private storage: StorageProvider, private alertCtrl: AlertController, private authService: AuthService) { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no ErrorInterceptor");
        return next.handle(request)
        .catch((error, caught) => {
            let msg = "";
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            
            console.log("Erro detectado pelo ErrorInterceptorProvider:");
            console.log(errorObj);
            
            switch(errorObj.status) {
                case 403: this.handle401();
                break;
                case 403: this.handle403();
                break;
                default: this.handleDefaultError(errorObj);
                break;

            }

            return Observable.throw(errorObj);

        }) as any;
    }

    handle403() {
        this.authService.signOut();
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptor = {
    provide: HTTP_INTERCEPTORS,
    userClass: ErrorInterceptorProvider,
    multi: true,
}
 