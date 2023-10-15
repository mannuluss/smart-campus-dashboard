import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloqueadorComponent } from './components/bloqueador/bloqueador.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [BloqueadorComponent, SpinnerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
})
export class LoaderModule {}
