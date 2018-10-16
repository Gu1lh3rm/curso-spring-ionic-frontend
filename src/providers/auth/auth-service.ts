import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { LocalUser } from '../../models/local_user';
import { StorageProvider } from '../storage/storage';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    
    jwtHelper: JwtHelper = new JwtHelper();
    
    user: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth, public http: HttpClient, public storage: StorageProvider){
        this.user = angularFireAuth.authState;
    }

    authenticate(creds: User) {
        console.log("teste de login");
        console.log(creds);
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfullLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    createUser(user: User) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    sendEmailVerification(user: User) {
        return this.angularFireAuth.auth.currentUser.sendEmailVerification();
    }

    signIn(user: User){
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    signOut() {
        this.storage.setLocalUser(null);
        return this.angularFireAuth.auth.signOut();
    }

    resetPassword(email: string){
        return this.angularFireAuth.auth.sendPasswordResetEmail(email);
    }
}
