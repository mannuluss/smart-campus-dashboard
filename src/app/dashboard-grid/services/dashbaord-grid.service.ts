import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import {
  DataGridDashboardDTO,
  GridDasboardDTO,
} from '../models/grid-dasboard.dto';
import { catchError, map, tap } from 'rxjs';
import { SnackbarService } from 'src/app/core/snackbar/services/snackbar.service';
import { GridsterItem } from 'angular-gridster2';
import { TemplateDTO } from 'src/app/core/models/template.dto';
import { RelationGristerTemplate } from '../models/data-grid-template';

@Injectable({
  providedIn: 'root',
})
export class DashbaordGridService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  getGridsterOptions() {
    return this.http
      .get<GridDasboardDTO>(`${environment.adminService}/dashboard/grid`)
      .pipe(
        catchError((err) => {
          return [null];
        }),
        map<GridDasboardDTO, GridDasboardDTO>((grid) => {
          if (grid?.data) {
            grid.json = JSON.parse(grid.data);
          }
          return grid;
        })
      );
  }

  postGridsterOptions(
    id: number,
    gristerItemArray: Array<GridsterItem>,
    templates: RelationGristerTemplate
  ) {
    let data: DataGridDashboardDTO[] = [];
    gristerItemArray.forEach((gridItem, index) => {
      let dataGrid: DataGridDashboardDTO = {
        grid: gridItem,
        formTemplate: templates[index],
      };
      data.push(dataGrid);
    });

    let gristerDashbaord: GridDasboardDTO = {
      id: id,
      userId: this.authService.user.id,
      data: JSON.stringify(data),
    };
    console.log('postGridsterOptions', gristerDashbaord);
    return this.http
      .put<GridDasboardDTO>(
        `${environment.adminService}/dashboard/grid`,
        gristerDashbaord
      )
      .pipe(
        map((grid) => {
          grid.json = JSON.parse(grid.data);
          return grid;
        }),
        tap<GridDasboardDTO>(() => {
          this.snackbarService.show({
            mensaje: 'Plantilla Guardada.',
            tipo: 'success',
          });
        })
      );
  }
}
