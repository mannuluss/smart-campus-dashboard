import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from './loader/loader.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoaderModule],
  exports: [LoaderModule],
})
export class CoreModule {}
