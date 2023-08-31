import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './libs/layout/layout.component';
import { TemplateGeneratorComponent } from './libs/graficas/components/template-generator.component';
const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: 'template',
        title: 'Crear Plantilla',
        component: TemplateGeneratorComponent,
        data: { state: 'template' },
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        data: { state: 'home' },
      },
      {
        path: 'panel-control',
        loadChildren: () =>
          import('./dashboard-grid/dashboard-grid.module').then(
            (m) => m.DashboardGridModule
          ),
        data: { state: 'panel-control' },
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
