import { AlertController } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
 
@Injectable()
export class ErrorInterceptorProvider implements HttpInterceptor {
 
    constructor(private storage: Storage, private alertCtrl: AlertController) { }
 
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

            
            msg = errorObj.message + '<br>Contate o Administrador';
            
            
 
            let alert = this.alertCtrl.create({
                title: error.name,
                message: msg,
                buttons: ['OK']
            });
            alert.present();

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);
            return Observable.throw(errorObj);

        }) as any;
    }
}

export const ErrorInterceptor = {
    provide: HTTP_INTERCEPTORS,
    userClass: ErrorInterceptorProvider,
    multi: true,
}
 