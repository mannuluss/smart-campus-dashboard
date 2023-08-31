import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficasModule } from './libs/graficas/graficas.module';
import { MaterialModule } from './libs/material/material.module';
import { LibsModule } from './libs/libs.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS_APP_MODULE } from './core/http-interceptors-ppal';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from './core/loader/loader.module';
import { MaterialProviders } from './libs/material/mat-providers';

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
  ],
  providers: [...HTTP_INTERCEPTORS_APP_MODULE, ...MaterialProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
