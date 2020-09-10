import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { NavModule } from 'src/app/nav/nav.module';
import { UtilsModule } from 'src/app/utils/utils.module';
import { ResultMainComponent } from './result-main/result-main.component';

const routes: Routes = [
    {
        path: '', children: [
            {path: '', redirectTo: '/result/main', pathMatch: 'full'},
            {path: 'main', component: ResultMainComponent}
        ]
    }
];

@NgModule({
    declarations: [ResultMainComponent],
    imports: [
        CommonModule,
        NavModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatSortModule,
        UtilsModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ResultModule {
}
