import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ]
})
export class GraficasModule { }
