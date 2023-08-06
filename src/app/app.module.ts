import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficasModule } from './libs/graficas/graficas.module';
import { MaterialModule } from './libs/material/material.module';
import { LibsModule } from './libs/libs.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS_APP_MODULE } from './core/loader/http-interceptors-ppal';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from './core/loader/loader.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoaderModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    LibsModule,
    GraficasModule,
    MaterialModule,
    NgChartsModule,
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
    ...HTTP_INTERCEPTORS_APP_MODULE,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
