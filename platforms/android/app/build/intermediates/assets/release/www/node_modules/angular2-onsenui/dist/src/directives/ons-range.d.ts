import { ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
/**
 * @element ons-range
 * @directive OnsRange
 * @selector ons-range
 * @description
 *   [en]Angular 2 directive for `<ons-range>` component.[/en]
 *   [ja]`<ons-range>`要素のAngular 2ディレクティブです。[/en]
 * @example
 *   <ons-range [(value)]="foo"></ons-range><br>
 *
 *   <!-- Add (input) to change immediately on dragging range component -->
 *   <ons-range [(value)]="bar" (input)="bar = $event.target.value"></ons-range>
 */
export declare class OnsRange implements OnChanges, OnDestroy {
    private _elementRef;
    private _element;
    private _boundOnChange;
    /**
     * @input value
     * @type {string}
     * @desc
     *   [en]Input value of the `<ons-range>` element..[/en]
     *   [ja]`ons-range`要素に対する入力値を指定します。[/ja]
     */
    _value: string;
    /**
     * @output valueChange
     * @type {string}
     * @desc
     *   [en]Triggers when the value is changed.[/en]
     *   [ja]値が変更された時に発火します。[/ja]
     */
    _valueChange: EventEmitter<string>;
    constructor(_elementRef: ElementRef);
    _onChange(event: any): void;
    ngOnChanges(changeRecord: {
        [key: string]: SimpleChange;
    }): void;
    readonly element: any;
    ngOnDestroy(): void;
}
