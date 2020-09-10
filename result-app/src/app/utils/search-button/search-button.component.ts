import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-search-button',
    templateUrl: './search-button.component.html',
    styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent {
    @ViewChild('searchInput') searchInput: ElementRef;
    @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
    public searchText: string;
    public searchVisible = false;

    public isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private _breakpointObserver: BreakpointObserver) {
    }

    public textChangedSlot(event: string): void {
        this.searchText = event;
        this.searchTextChanged.emit(event);
    }

    public searchSlot(event) {
        event.stopPropagation();
        if (!this.searchVisible) {
            this.searchVisible = true;
            (this.searchInput.nativeElement as HTMLInputElement).focus();
        }
    }

    @HostListener('document:click')
    clickOutsideSlot() {
        if (this.searchText) {
            return;
        }
        this.searchVisible = false;
        delete this.searchText;
    }
}
