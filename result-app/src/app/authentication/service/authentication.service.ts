import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private angularFireAuth: AngularFireAuth,
                private router: Router) {
    }

    public logout(): void {
        this.angularFireAuth.signOut();
        this.router.navigate(['']);
    }
}
