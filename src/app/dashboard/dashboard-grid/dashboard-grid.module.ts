import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardGridComponent } from './pages/dashboard-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { MaterialModule } from '@shared/material/material.module';
import { DashbaordGridRoutingModule } from './dashboard-grid-routing.module';
import { DashbaordGridItemComponent } from './components/dashbaord-grid-item/dashbaord-grid-item.component';
import { ModalGridTemplateComponent } from './components/modal-grid-template/modal-grid-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  MomentDateModule,
} from '@angular/material-moment-adapter';
import { TemplateGeneratorModule } from '../template-generator/template-generator.module';

@NgModule({
  declarations: [
    DashboardGridComponent,
    DashbaordGridItemComponent,
    ModalGridTemplateComponent,
  ],
  imports: [
    CommonModule,
    DashbaordGridRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridsterModule,
    MaterialModule,
    TemplateGeneratorModule,
    NgApexchartsModule,
    MomentDateModule,
  ],
})
export class DashboardGridModule {}
