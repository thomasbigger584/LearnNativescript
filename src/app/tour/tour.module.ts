import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TourRoutingModule } from "./tour-routing.module";
import { TourComponent } from "./tour.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TourRoutingModule
    ],
    declarations: [
        TourComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TourModule { }
