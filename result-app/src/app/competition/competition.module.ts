import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavModule } from 'src/app/nav/nav.module';
import { UtilsModule } from 'src/app/utils/utils.module';
import { CompetitionCreatorComponent } from './competition-creator/competition-creator.component';
import { CompetitionMainComponent } from './competition-main/competition-main.component';

const routes: Routes = [
    {
        path: '', children: [
            {path: '', redirectTo: '/competitions/main', pathMatch: 'full'},
            {path: 'main', component: CompetitionMainComponent},
            {path: 'creator', component: CompetitionCreatorComponent}
        ]
    }
];

@NgModule({
    declarations: [
        CompetitionCreatorComponent,
        CompetitionMainComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NavModule,
        UtilsModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        TranslateModule
    ]
})
export class CompetitionModule {
}
