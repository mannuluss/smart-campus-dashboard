import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CaruselModule } from './carusel/carusel.module';
import { LayoutComponent } from './layout/layout.component';
import { ListColorsModule } from './list-colors/list-colors.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    MatIconModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    ListColorsModule,
  ],
  exports: [LayoutComponent, MaterialModule, CaruselModule, ListColorsModule],
})
export class SharedModule {}
