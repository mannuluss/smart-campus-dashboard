import { ChartOptions } from './apexchart.type';

export class defaultChartConfig {
  static get base(): ChartOptions {
    return {
      dataLabels: {
        enabled: true,
      },
      chart: {
        type: 'line',
        height: '500px',
      },
      title: {
        align: 'center',
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        // offsetX: -5,
      },
      grid: {
        show: true,
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 5,
      },
    };
  }

  /**
   * configuracion por defecto para graficas de tipo barra.
   */
  static get bar(): ChartOptions {
    return {
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: true,
          // tools:{
          //   customIcons
          // }
        },
      },
      ...this.base,
    };
  }
}
