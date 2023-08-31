import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LibsRoutingModule } from "./libs-routing.module";
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutComponent } from "./layout/layout.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CaruselModule } from "./carusel/carusel.module";
import { ListColorsModule } from "./list-colors/list-colors.module";

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        LibsRoutingModule,
        MaterialModule,
        MatIconModule,
        RouterModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule,
        ListColorsModule,
    ],
    exports: [
        LayoutComponent,
        MaterialModule,
        CaruselModule,
        ListColorsModule,
    ],
})
export class LibsModule {}

