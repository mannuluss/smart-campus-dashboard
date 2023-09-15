import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { GridsterModule } from 'angular-gridster2';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, TutorialComponent],
  imports: [CommonModule, HomeRoutingModule, GridsterModule, MatButtonModule],
})
export class HomeModule {}
