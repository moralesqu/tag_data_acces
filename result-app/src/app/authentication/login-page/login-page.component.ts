import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';
import { TranslateAppService } from 'src/app/service/translate-app.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
    public loginForm: FormGroup;

    public env = environment;

    constructor(private translateAppService: TranslateAppService,
                private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder,
                private angularFireAuth: AngularFireAuth,
                private router: Router) {
        this.loginForm = this.formBuilder.group({
            email: [, [Validators.required]],
            password: [, [Validators.required]]
        });
    }

    public login(): void {
        this.angularFireAuth.signInWithEmailAndPassword(this.loginForm.get('email').value,
            this.loginForm.get('password').value).then(() => {
            this.router.navigate(['']);
        });
    }

    public google_login(): void {
        this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
            this.router.navigate(['']);
        });
    }
}
