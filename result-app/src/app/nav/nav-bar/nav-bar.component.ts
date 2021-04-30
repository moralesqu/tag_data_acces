import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    @ViewChild('drawer') drawer: MatSidenav;
    @Input() isSideNavigationActive = true;
    @Input() isHomePageActive = false;
    public isExpanded = false;
    public isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private _breakpointObserver: BreakpointObserver,
                private _authenticationService: AuthenticationService,
                private _router: Router) {
    }

    public menuButtonSlot(): void {
        if (!this._breakpointObserver.isMatched(Breakpoints.Handset)) {
            this.isExpanded = !this.isExpanded;
            return;
        }
        this.isExpanded = true;
        this.drawer.toggle();
    }

    public homeSlot(): void {
        this._router.navigate(['/']);
    }

    public logoutSlot(): void {
        this._authenticationService.logout();
    }

}
