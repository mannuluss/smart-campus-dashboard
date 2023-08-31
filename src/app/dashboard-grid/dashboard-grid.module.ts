import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardGridComponent } from './pages/dashboard-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { MaterialModule } from '../libs/material/material.module';
import { DashbaordGridRoutingModule } from './dashboard-grid-routing.module';
import { DashbaordGridItemComponent } from './components/dashbaord-grid-item/dashbaord-grid-item.component';
import { ModalGridTemplateComponent } from './components/modal-grid-template/modal-grid-template.component';
import { GraficasModule } from '../libs/graficas/graficas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DashboardGridComponent,
    DashbaordGridItemComponent,
    ModalGridTemplateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashbaordGridRoutingModule,
    GridsterModule,
    MaterialModule,
    GraficasModule,
    NgApexchartsModule,
  ],
})
export class DashboardGridModule {}
