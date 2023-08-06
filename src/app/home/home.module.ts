import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

@NgModule({
  declarations: [HomeComponent, TutorialComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
