import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { GridsterModule } from 'angular-gridster2';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [HomeComponent, TutorialComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GridsterModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    MatDividerModule,
  ],
})
export class HomeModule {}
