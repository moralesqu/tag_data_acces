import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResultApiService } from 'src/app/result/service/result-api.service';

@Component({
    selector: 'app-result-main',
    templateUrl: './result-main.component.html',
    styleUrls: ['./result-main.component.scss']
})
export class ResultMainComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatSort) sort: MatSort;

    public displayedColumns: string[] = ['id', 'Lap1', 'Lap2', 'Lap3'];
    public dataSource = new MatTableDataSource([]);

    private subscriptionHandler;

    constructor(private _resultApiService: ResultApiService) {
    }

    ngOnInit(): void {
        this._resultApiService.startSubscription();
        this.subscriptionHandler = this._resultApiService.getTags()
            .subscribe((data) => {
                this.dataSource.data = data;
            });
    }

    public ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    public ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
        this._resultApiService.stopSubscription();
    }

    public searchTextSlot(filter: string): void {
        this.dataSource.filter = filter.trim().toLowerCase();
    }

    public downloadSlot(): void {
        this._resultApiService.downloadDataCSV();
    }

}
