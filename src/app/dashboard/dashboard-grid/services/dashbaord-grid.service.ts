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
import { RelationGristerTemplate } from '../models/data-grid-template';

@Injectable({
  providedIn: 'root',
})
export class DashbaordGridService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService,
  ) {}

  /**
   * Obtiene la configuracion de los dashbaord del usuario.
   * @returns
   */
  getGridsterOptions() {
    return this.http
      .get<GridDasboardDTO[]>(`${environment.adminService}/dashboard/grid`)
      .pipe(
        catchError((err) => {
          this.snackbarService.show({
            mensaje:
              'No se pudo obtener la configuracion del dashboard del usuario.',
            tipo: 'error',
          });
          throw err;
        }),
        map<GridDasboardDTO[], GridDasboardDTO[]>((grid) => {
          if (grid) {
            return grid.map((gridItem) => {
              gridItem.json = JSON.parse(gridItem.data);
              return gridItem;
            });
          }
          return grid;
        }),
      );
  }

  postGridsterOptions(
    id: number,
    name: string,
    gristerItemArray: Array<GridsterItem>,
    templates: RelationGristerTemplate,
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
      name: name,
      userId: this.authService.user.id,
      data: JSON.stringify(data),
    };
    return this.http
      .put<GridDasboardDTO>(
        `${environment.adminService}/dashboard/grid`,
        gristerDashbaord,
      )
      .pipe(
        catchError((err) => {
          this.snackbarService.show({
            mensaje: 'No se pudo guardar la configuracion del dashboard',
            tipo: 'error',
          });
          throw err;
        }),
        map((grid) => {
          grid.json = JSON.parse(grid.data);
          return grid;
        }),
        tap<GridDasboardDTO>(() => {
          this.snackbarService.show({
            mensaje: 'Plantilla Guardada.',
            tipo: 'success',
          });
        }),
      );
  }
}
