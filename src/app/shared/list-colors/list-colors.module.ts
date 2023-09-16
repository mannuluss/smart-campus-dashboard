import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListColorsComponent } from "./components/list-colors.component";
import { NgxColorsModule } from "ngx-colors";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [ListColorsComponent],
    imports: [
        CommonModule,
        NgxColorsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ],
    exports: [ListColorsComponent],
})
export class ListColorsModule {}
