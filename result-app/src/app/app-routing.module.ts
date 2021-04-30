import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/authentication/login-page/login-page.component';
import { HomePageComponent } from 'src/app/nav/home-page/home-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'result',
        loadChildren: () => import('./result/result.module').then(m => m.ResultModule),
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'competitions',
        loadChildren: () => import('./competition/competition.module').then(m => m.CompetitionModule),
        ...canActivate(redirectUnauthorizedToLogin)
    }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
