import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibsRoutingModule } from './libs-routing.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    LibsRoutingModule,
    MaterialModule,
    MatIconModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class LibsModule { }
