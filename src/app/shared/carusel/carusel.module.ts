import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaruselComponent } from './components/carusel/carusel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CaruselComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  exports: [CaruselComponent],
})
export class CaruselModule {}
