import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGridComponent } from './pages/dashboard-grid.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardGridComponent,
    title: 'Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbaordGridRoutingModule {}
