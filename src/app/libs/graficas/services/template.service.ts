import { Injectable } from '@angular/core';
import { ChartOptions } from '../config/apexchart.type';
import { SnackbarService } from 'src/app/core/snackbar/services/snackbar.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { ChartType } from 'ng-apexcharts';
import { defaultChartConfig } from '../config/default.chart.config';
import { HttpClient } from '@angular/common/http';
import { TemplateDTO } from 'src/app/core/models/template.dto';
import { FormChartOptions } from '../models/form-chart-options';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(
    private snackbarService: SnackbarService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllTamplates(filterText?: string) {
    let params = null;
    if (filterText) {
      params = {
        search: filterText,
      };
    }
    return this.http
      .get<TemplateDTO[]>(`${environment.adminService}/dashboard/template/all`)
      .pipe(
        catchError((error: any) => {
          this.snackbarService.showBackError(error);
          return [];
        }),
        map((templates) => {
          return templates.map((template) => {
            template.json = JSON.parse(template.data);
            return template;
          });
        })
      );
  }

  getTemplateById(id: any) {
    return this.http
      .get<TemplateDTO>(`${environment.adminService}/dashboard/template/${id}`)
      .pipe(
        tap((template) => {
          template.json = JSON.parse(template.data);
        })
      );
  }

  saveTemplate(chartOptions: ChartOptions, nameTemplate: string) {
    let template: TemplateDTO = {
      id: null,
      name: nameTemplate,
      userId: this.authService.user.id,
      data: JSON.stringify(this.chartOptionsToForm(chartOptions)),
    };
    return this.http
      .post(`${environment.adminService}/dashboard/template`, template)
      .pipe(
        catchError((error: any) => {
          this.snackbarService.showBackError(error);
          return [];
        }),
        tap<TemplateDTO>(() => {
          this.snackbarService.show({
            mensaje: 'Plantilla Guardada.',
            tipo: 'success',
          });
        })
      );
  }

  updateTemplate(
    chartOptions: ChartOptions,
    idTemplate: number,
    nameTemplate: string
  ) {
    let template: TemplateDTO = {
      id: idTemplate,
      name: nameTemplate,
      userId: this.authService.user.id,
      data: JSON.stringify(this.chartOptionsToForm(chartOptions)),
    };
    return this.http
      .put(`${environment.adminService}/dashboard/template`, template)
      .pipe(
        catchError((error: any) => {
          this.snackbarService.showBackError(error);
          return [];
        }),
        tap<TemplateDTO>(() => {
          this.snackbarService.show({
            mensaje: 'Plantilla Guardada.',
            tipo: 'success',
          });
        })
      );
  }

  deleteTemplate(idTemplate: string) {
    return this.http
      .delete(`${environment.adminService}/dashboard/template/${idTemplate}`)
      .pipe(
        catchError((error: any) => {
          this.snackbarService.showBackError(error);
          return [];
        }),
        tap<TemplateDTO>(() => {
          this.snackbarService.show({
            mensaje: 'Plantilla Eliminada.',
            tipo: 'success',
          });
        })
      );
  }

  /**
   * obtiene el valor de una propiedad de un objeto dentro de la varible parentVar.
   * @param path
   * @returns
   * @example
   * getProperty('chart.type') => 'line'
   * getProperty('title.text') => 'Average High & Low Temperature'
   */
  getProperty(path: string, parentVar: any): any {
    return path.split('.').reduce((acc, key) => {
      if (acc && acc.hasOwnProperty(key)) {
        return acc[key];
      }
      return undefined;
    }, parentVar);
  }

  /**
   * asigna el valor de una propiedad de un objeto dentro de la varible parentVar.
   * @param path
   * @param parentVar
   * @param value
   */
  setProperty(path: string, parentVar: any, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop();

    const nestedObj = keys.reduce((acc, key) => {
      if (!acc[key]) {
        acc[key] = {};
      }
      return acc[key];
    }, parentVar);

    nestedObj[lastKey] = value;
  }

  /**
   * convierte la configuracion de la grafica en un formulario.
   * @param chartOptions
   * @returns
   */
  chartOptionsToForm(chartOptions: ChartOptions) {
    let formulario: FormChartOptions = {};
    formulario['chart.type'] = chartOptions.chart.type;
    formulario['series'] = chartOptions.series;
    formulario['colors'] = chartOptions.colors;
    formulario['title.text'] = chartOptions.title.text;
    formulario['xaxis.title.text'] = chartOptions.xaxis?.title?.text;
    formulario['yaxis.title.text'] = chartOptions.yaxis?.title?.text;
    formulario['xaxis.categories'] = chartOptions.xaxis?.categories;

    return formulario;
  }

  formToChartOptions(form: FormChartOptions, chartOptions?: ChartOptions) {
    if (!chartOptions) {
      chartOptions = defaultChartConfig.base;
    }
    chartOptions.chart.type = form['chart.type'] as ChartType;
    chartOptions.series = form['series'];
    chartOptions.colors = form['colors'];
    chartOptions.title = {};
    chartOptions.title.text = form['title.text'];
    chartOptions.xaxis = {};
    chartOptions.xaxis.title = {};
    chartOptions.xaxis.title.text = form['xaxis.title.text'];
    chartOptions.yaxis = {};
    chartOptions.yaxis.title = {};
    chartOptions.yaxis.title.text = form['yaxis.title.text'];
    chartOptions.xaxis.categories = form['xaxis.categories'];
    console.log('chartOptions', chartOptions);
    return chartOptions;
  }
}
