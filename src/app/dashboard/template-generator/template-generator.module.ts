import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CaruselModule } from '@shared/carusel/carusel.module';
import { ListColorsModule } from '@shared/list-colors/list-colors.module';
import { MaterialModule } from '@shared/material/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TemplateGeneratorComponent } from './pages/template-generator.component';
import { TemplateGeneratorRoutingModule } from './template-generator-routing.module';

@NgModule({
  declarations: [TemplateGeneratorComponent],
  imports: [
    CommonModule,
    TemplateGeneratorRoutingModule,
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
export class TemplateGeneratorModule {}
