import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { ObservableArray } from "@nativescript/core/data/observable-array/observable-array";

import { Toasty } from "nativescript-toasty";

export interface IPagerItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    @ViewChild("pager", { static: true })
    pager: ElementRef;

    items: ObservableArray<IPagerItem>;

    constructor() {
        const pagerItems: Array<IPagerItem> = [
            {
                id: 1,
                title: "Slide 1",
                description: "This is a description 1",
                image: "https://s-media-cache-ak0.pinimg.com/originals/4c/92/cc/4c92cc1dfbde6a6a40fe799f56fa9294.jpg"
            },
            {
                id: 2,
                title: "Slide 2",
                description: "This is a description 2",
                image: "https://images.unsplash.com/photo-1487715433499-93acdc0bd7c3?auto=format&fit=crop&w=2228&q=80"
            },
            {
                id: 4,
                title: "Slide 4",
                description: "This is a description 4",
                image: "https://i.annihil.us/u/prod/marvel/i/mg/d/f0/558982863130d.jpg"
            },
            {
                id: 5,
                title: "Slide 5",
                description: "This is a description 5",
                image: "https://images.unsplash.com/photo-1466872732082-8966b5959296?auto=format&fit=crop&w=2100&q=80"
            },
            {
                id: 6,
                title: "Slide 6",
                description: "This is a description 6",
                image: "https://images.unsplash.com/photo-1464061884326-64f6ebd57f83?auto=format&fit=crop&w=2100&q=80"
            },
            {
                id: 7,
                title: "Slide 7",
                description: "This is a description 7",
                image: "https://images.unsplash.com/photo-1519625073050-2815233885ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"
            },
            {
                id: 9,
                title: "Slide 9",
                description: "This is a description 9",
                image: "https://images.unsplash.com/photo-1474861644511-0f2775ae97cc?auto=format&fit=crop&w=2391&q=80"
            }
        ];
        this.items = new ObservableArray(pagerItems);
    }

    ngOnInit(): void {
        console.log("ngOnInit");
    }

    onStartTourPress(event): void {
        new Toasty({ text: "Toast message" }).show();
    }
}
