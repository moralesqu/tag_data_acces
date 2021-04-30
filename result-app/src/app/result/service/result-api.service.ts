import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { ApiSettingsService } from 'src/app/service/apiSettings.service';
import { TagResult } from 'src/app/utils/providers/tag-result';

interface TagAnswer {
    data: {
        id: string,
        timestamps: number[]
    }[]
}

@Injectable({
    providedIn: 'root'
})
export class ResultApiService {
    private _tags: BehaviorSubject<TagResult[]> = new BehaviorSubject<TagResult[]>([]);
    private _subscriberHandler;

    constructor(private _http: HttpClient,
                private _apiSettingsService: ApiSettingsService) {
        this._refreshSubscription();
    }

    public startSubscription(time: number = 1000): void {
        this.stopSubscription();
        this._subscriberHandler = setInterval(() => {
            this._refreshSubscription();
        }, time);

    }

    public stopSubscription(): void {
        if (this._subscriberHandler) {
            clearInterval(this._subscriberHandler);
            delete this._subscriberHandler;
        }

    }

    public getTags(): Observable<TagResult[]> {
        this._refreshSubscription();
        return this._tags.asObservable();
    }

    private _refreshSubscription(): void {
        this._http.get<TagAnswer>(`${this._apiSettingsService.getApiUrl()}/data`)
            .pipe(timeout(this._apiSettingsService.getTimeout()))
            .subscribe((data) => {
                this._tags.next(
                    data.data.map<TagResult>((item) =>
                        new TagResult(item.id, item.timestamps.map<Date>((time) => new Date(Math.round(time)))))
                );
            });
    }

    public downloadDataCSV(): void {
        this._http.get(`${this._apiSettingsService.getApiUrl()}/data/csv`, {
            responseType: 'blob'
        }).subscribe(x => {
                // It is necessary to create a new blob object with mime-type explicitly set
                // otherwise only Chrome works like it should
                const newBlob = new Blob([x], {type: 'text/csv'});

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob);
                    return;
                }

                // For other browsers:
                // Create a link pointing to the ObjectURL containing the blob.
                const data = window.URL.createObjectURL(newBlob);

                const link = document.createElement('a');
                link.href = data;
                link.download = 'result.csv';
                // this is necessary as link.click() does not work on the latest firefox
                link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

                setTimeout(function () {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data);
                    link.remove();
                }, 100);
            },
            error1 => {
                console.log(error1)
            });
    }
}
