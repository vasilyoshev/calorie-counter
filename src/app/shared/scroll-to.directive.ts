import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({ selector: '[appScrollTo]' })
export class ScrollToDirective implements AfterViewInit {
    constructor(private elRef: ElementRef) { }
    ngAfterViewInit() {
        this.elRef.nativeElement.scrollIntoView();
    }
}
