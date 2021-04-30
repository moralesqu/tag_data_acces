import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { NavModule } from 'src/app/nav/nav.module';
import { environment } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NavModule,
        AuthenticationModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-center',
            enableHtml: true,
            maxOpened: 3,
            preventDuplicates: true,
            progressBar: true
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/translation/dictionary/', '.json');
}
