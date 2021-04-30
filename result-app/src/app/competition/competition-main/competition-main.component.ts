import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PlanedCompetition } from 'src/app/competition/providers/planed-competition';
import { CompetitionService } from 'src/app/competition/service/competition.service';

@Component({
    selector: 'app-competition-main',
    templateUrl: './competition-main.component.html',
    styleUrls: ['./competition-main.component.scss']
})
export class CompetitionMainComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;

    public displayedColumns: string[] = ['competitionDate', 'id'];
    public dataSource = new MatTableDataSource([]);
    private subscriptionHandler;

    constructor(private competitionService: CompetitionService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscriptionHandler = this.competitionService.competitions$
            .subscribe((data) => {
                this.dataSource.data = data.map<PlanedCompetition>((item) => {
                    const ret = item.payload.doc.data();
                    ret.competitionDate = new Date(ret.competitionDateTimestamp.seconds * 1000);
                    console.log(ret);
                    return ret;
                });
                console.log(this.dataSource);
            });
    }

    public searchTextSlot(filter: string): void {
        this.dataSource.filter = filter.trim().toLowerCase();
    }

    public addSlot(): void {
        this.router.navigate(['/competitions/creator']);
    }
}
