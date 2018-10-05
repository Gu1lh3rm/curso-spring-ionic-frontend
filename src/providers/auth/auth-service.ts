import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth){
        this.user = angularFireAuth.authState;
    }
}
