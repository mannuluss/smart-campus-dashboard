import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoaderModule } from './core/loader/loader.module';
import { HTTP_INTERCEPTORS_APP_MODULE } from './core/providers/http-interceptors-ppal';
import { GraficasModule } from './libs/graficas/graficas.module';
import { LibsModule } from './libs/libs.module';
import { MaterialProviders } from './libs/material/providers/mat-providers';
import { MaterialModule } from './libs/material/material.module';

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
