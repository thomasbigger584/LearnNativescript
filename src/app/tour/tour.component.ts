import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Accuracy } from "tns-core-modules/ui/enums";
import * as geolocation from "nativescript-geolocation";
import { MapboxViewApi, Viewport as MapboxViewport, LatLng } from "nativescript-mapbox";
import { TourData } from "./TourData";
import { Toasty } from "nativescript-toasty";

@Component({
    selector: "Tour",
    templateUrl: "./tour.component.html",
    styleUrls: ["tour.css"]
})
export class TourComponent implements OnInit {
    private map: MapboxViewApi;

    private currentLat = 54.621900;
    private currentLng = -6.214950;

    ngOnInit(): void {
        console.log("checking if geolocation is enabled");
        geolocation.isEnabled().then((enabled) => {
            this.toast("isEnabled =" + enabled);
            if (enabled) {
                this.getUserLocation();
            } else {
                this.requestLocationPermissions();
            }
        }, (e) => {
            this.toast("isEnabled error " +  e);
            this.requestLocationPermissions();
        });
    }

    requestLocationPermissions() {
        geolocation.enableLocationRequest().then(() => {
            this.toast("location enabled!");
            this.getUserLocation();
        }, (e) => {
            this.toast("Failed to enable", e);
        });
    }

    getUserLocation() {
        console.log("watchLocation()");
        geolocation.watchLocation((position) => {
            this.currentLat = position.latitude;
            this.currentLng = position.longitude;
            const locationString = "Lat(" + this.currentLat + "), Lng(" + this.currentLng + ")";
            this.toast(locationString);
        }, (e) => {
            this.toast("failed to get location");
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 500
        });
    }

    onMapReady(args: any) {
        this.map = args.map;
        const tourData = new TourData();
        const thisTourData = tourData.getTourData();
        const route = thisTourData.routes[0];
        const routeGeopmetry = route.geometry;
        const routeCoordinates = routeGeopmetry.coordinates;

        const latLngs: Array<LatLng> = [];
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < routeCoordinates.length; index++) {
            const routeCoord = routeCoordinates[index];
            latLngs.push({ lng: routeCoord[0], lat: routeCoord[1] });
        }

        if (latLngs.length > 1) {
            const startLatLng: LatLng = latLngs[0];
            const endLatLng: LatLng = latLngs[latLngs.length - 1];
            this.map.addPolyline({
                id: new Date().getTime(),
                width: 8,
                color: "red",
                points: latLngs
            });
            this.map.addMarkers([{
                id: new Date().getTime(),
                title: "Start",
                subtitle: "Starting Location",
                selected: true,
                lat: startLatLng.lat,
                lng: startLatLng.lng
            },
            {
                id: new Date().getTime(),
                title: "End",
                subtitle: "Ending Location",
                selected: true,
                lat: endLatLng.lat,
                lng: endLatLng.lng
            }]);
        }
    }

    toast(msg: string): void {
        new Toasty({ text: msg }).show();
    }
}
