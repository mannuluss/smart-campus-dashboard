import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateGeneratorComponent } from './pages/template-generator.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateGeneratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateGeneratorRoutingModule {}
