import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-sidenav-element',
    templateUrl: './sidenav-element.component.html',
    styleUrls: ['./sidenav-element.component.scss']
})
export class SidenavElementComponent {
    @Input() isExpanded: boolean;
    @Input() isActive = false;
    @Input() label: string;
    @Input() matIcon: string;
    @Output() click = new EventEmitter<void>();

    constructor() {
    }
}
