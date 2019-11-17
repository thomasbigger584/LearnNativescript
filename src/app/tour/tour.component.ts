import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Accuracy } from "tns-core-modules/ui/enums";
import * as geolocation from "nativescript-geolocation";

@Component({
    selector: "Tour",
    templateUrl: "./tour.component.html"
})
export class TourComponent implements OnInit {

    currentLat = 54.621900;
    currentLng = -6.214950;

    @ViewChild("map", { static: true })
    mapbox: ElementRef;

    ngOnInit(): void {
        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(enabled => {
            console.log('isEnabled =', enabled);
            if (enabled) {
                this.watch();
            } else {
                this.request();
            }
        }, e => {
            console.log('isEnabled error', e);
            this.request();
        });
    }

    request() {
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(() => {
            console.log('location enabled!');
            this.watch();
        }, e => {
            console.log('Failed to enable', e);
        });
    }

    watch() {
        console.log('watchLocation()');
        geolocation.watchLocation(position => {
            this.currentLat = position.latitude;
            this.currentLng = position.longitude;
        }, e => {
            console.log('failed to get location');
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 500
        });
    }

    onMapReady(args: any) {
        args.map.setCenter(
            {
                lat: this.currentLat, // mandatory
                lng: this.currentLng, // mandatory
                animated: true, // default true
                zoomLevel: 14
            }
        )
    }
}
