import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TemplateGeneratorComponent } from "./components/template-generator.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxColorsModule } from "ngx-colors";
import { CaruselModule } from "../carusel/carusel.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ListColorsModule } from "../list-colors/list-colors.module";

@NgModule({
    declarations: [TemplateGeneratorComponent],
    imports: [
        CommonModule,
        CaruselModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule,
        MaterialModule,
        MatTooltipModule,
        ListColorsModule,
    ],
    exports: [TemplateGeneratorComponent],
})
export class GraficasModule {}
