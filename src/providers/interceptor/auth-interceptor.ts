import { AlertController } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { StorageProvider } from '../storage/storage';
import { API_CONFIG } from '../../config/api.config';
 
@Injectable()
export class AuthInterceptorProvider implements HttpInterceptor {
 
    constructor(private storage: StorageProvider, private alertCtrl: AlertController) { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no AuthInterceptor");

        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;

        let requestToAPI = request.url.substring(0, N) == API_CONFIG.baseUrl;

        if (localUser && requestToAPI) {
            const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        } else {
            return next.handle(request);
        }
    }
}

export const AuthInterceptor = {
    provide: HTTP_INTERCEPTORS,
    userClass: AuthInterceptorProvider,
    multi: true,
}
 