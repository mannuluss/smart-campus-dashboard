import { Injectable } from '@angular/core';
import { ChartOptions } from '../config/apexchart.type';
import { SnackbarService } from 'src/app/core/snackbar/services/snackbar.service';
import { catchError, map, tap } from 'rxjs';
import { ChartType } from 'ng-apexcharts';
import { defaultChartConfig } from '../config/default.chart.config';
import { HttpClient } from '@angular/common/http';
import { TemplateDTO } from 'src/app/core/models/template.dto';
import { FormChartOptions } from '../models/form-chart-options';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { DataMessageDTO } from 'src/app/core/models/data.dto';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(
    private snackbarService: SnackbarService,
    private http: HttpClient,
    private authService: AuthService,
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
        }),
      );
  }

  getTemplateById(id: any) {
    return this.http
      .get<TemplateDTO>(`${environment.adminService}/dashboard/template/${id}`)
      .pipe(
        tap((template) => {
          template.json = JSON.parse(template.data);
        }),
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
        }),
      );
  }

  updateTemplate(
    chartOptions: ChartOptions,
    idTemplate: number,
    nameTemplate: string,
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
        }),
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
        }),
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
    formulario['dataLabels.enabled'] = chartOptions.dataLabels.enabled;
    formulario['colors'] = chartOptions.colors;
    formulario['title.text'] = chartOptions.title.text;
    formulario['xaxis.title.text'] = chartOptions.xaxis?.title?.text;
    formulario['yaxis.title.text'] = chartOptions.yaxis?.title?.text;

    return formulario;
  }

  /**
   * mapper que convierte los valores del formulario de la grafica, en la configuracion de la grafica.
   * @param form valores del fomulario de la plantilla y la configuracion de la grafica.
   * @param chartOptions opciones de la grafica, en caso de no enviar se crea una nueva.
   * @returns
   */
  formToChartOptions(form: FormChartOptions, chartOptions?: ChartOptions) {
    if (!chartOptions) {
      chartOptions = defaultChartConfig.base;
    }
    chartOptions.chart.type = form['chart.type'] as ChartType;
    chartOptions.dataLabels.enabled = form['dataLabels.enabled'];
    chartOptions.colors = form['colors'];
    chartOptions.title.text = form['title.text'];
    chartOptions.xaxis.title.text = form['xaxis.title.text'];
    //solucionar bug de y que se vuelve un arreglo
    chartOptions.yaxis = { title: {} };
    chartOptions.yaxis.title.text = form['yaxis.title.text'];
    return chartOptions;
  }

  /**
   *
   * @param data datos de la grafica
   * @param typeGraph tipo de la grafica
   * @param series en caso de agregar la informacion a una serie existente.
   * @param categories en caso de agregar la informacion a una serie existente.
   * @param realtime si se debe eliminar el primer elemento de la serie y las categorias. (utilizado en realtime)
   * @returns
   */
  dataToSeries(
    data: DataMessageDTO[],
    chartOptions: ChartOptions,
    realtime?: boolean,
  ) {
    //revisa si ya existia la serie
    if (!chartOptions.series) {
      chartOptions.series = [];
    }
    //si no hay datos, se sale
    if (data.length == 0) {
      return;
    }
    if (!chartOptions.xaxis.categories) {
      chartOptions.xaxis.categories = [];
    }

    if (
      chartOptions.chart.type == 'line' ||
      chartOptions.chart.type == 'area'
    ) {
      if (!chartOptions.series) {
        chartOptions.series = [];
      }
      let tempSeries: any[] = chartOptions.series;
      //se recorren los nuevos datos para agregarlos en la serie
      data.forEach((item, i) => {
        //nombre de los datos en las series
        let keys = Object.keys(item.values);
        keys.forEach((key) => {
          let dato: any = [
            new Date(item.timeStamp).getTime(),
            item.values[key],
          ];
          let serie = tempSeries.findIndex((serie) => serie.name === key);
          //busca si la seria ya existe y le agrega el dato nuevo
          if (serie > -1) {
            tempSeries[serie].data.push(dato);
          } else {
            tempSeries.push({
              name: key,
              data: [dato as any],
            });
          }
        });
      });
      chartOptions.series = tempSeries;
      chartOptions.xaxis.type = 'datetime';
      chartOptions.xaxis.labels = {
        //format: 'HH:mm:ss',
        datetimeUTC: false,
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
          minute: 'HH:mm',
          second: 'HH:mm:ss',
        },
      };
    } else if (chartOptions.chart.type == 'bar') {
      if (!chartOptions.series || chartOptions.series.length == 0) {
        chartOptions.series = [];
      }
      data.forEach((item, i) => {
        let keys = Object.keys(item.values);
        keys.forEach((key) => {
          let serie = chartOptions.series.find((serie) => serie.name == key);
          if (serie) {
            serie.data.push(item.values[key]);
          } else {
            chartOptions.series.push({
              name: key,
              data: [item.values[key]],
            });
          }
        });
      });
      chartOptions.labels = data.map((item) =>
        moment(item.timeStamp).format('DD-MM'),
      );
      console.log('DATOS barra', data, chartOptions.labels);
    } else if (
      chartOptions.chart.type == 'pie' ||
      chartOptions.chart.type == 'donut' ||
      chartOptions.chart.type == 'radialBar'
    ) {
      let allData = {};
      data.forEach((item, i) => {
        let keys = Object.keys(item.values);
        keys.forEach((key) => {
          if (!allData[key]) {
            allData[key] = [];
          }
          allData[key].push(item.values[key]);
        });
      });
      //se obtiene el promedio de los datos para cada key
      chartOptions.xaxis.categories = Object.keys(allData);
      chartOptions.labels = Object.keys(allData);
      //saca el promedio de los datos
      chartOptions.xaxis.categories.forEach((key, i) => {
        let sum = allData[key].reduce((a, b) => a + b, 0);
        let avg = sum / allData[key].length || 0;
        chartOptions.series[i] = avg as any;
      });
    }
    return chartOptions;
  }
}
