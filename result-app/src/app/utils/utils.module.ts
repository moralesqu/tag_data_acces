import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavElementComponent } from './sidenav-element/sidenav-element.component';
import { SearchButtonComponent } from './search-button/search-button.component';


@NgModule({
    declarations: [SidenavElementComponent, SearchButtonComponent],
    imports: [
        CommonModule,
        MatTooltipModule,
        MatRippleModule,
        MatIconModule,
        TranslateModule,
        MatButtonModule,
        FormsModule
    ],
    exports: [
        SidenavElementComponent,
        SearchButtonComponent
    ]
})
export class UtilsModule {
}
