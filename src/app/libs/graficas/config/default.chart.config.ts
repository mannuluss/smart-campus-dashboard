import { ApexOptions, ApexResponsive } from 'ng-apexcharts';
import { ChartOptions } from './apexchart.type';

export class defaultChartConfig {
  static get base(): ChartOptions {
    return {
      dataLabels: {
        enabled: false,
      },
      chart: {
        type: 'line',
        height: '450px',
        toolbar: {
          offsetX: -80,
          show: true,
        },
      },
      title: {
        align: 'left',
        floating: false,
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 3,
      },
      legend: {
        show: true,
        horizontalAlign: 'right',
        floating: true,
        formatter: function (val, opts) {
          if (opts.w.config.chart.type == 'radialBar') {
            return (
              val +
              ' - ' +
              Number(opts.w.globals.series[opts.seriesIndex]).toFixed(2) +
              '%'
            );
          } else {
            return val;
          }
        },
      },
      grid: {
        show: true,
        borderColor: '#535a6c22',
        padding: {
          bottom: 8,
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        size: 0,
      },
      tooltip: { theme: 'dark', enabled: true },
      xaxis: {
        title: {},
      },
      yaxis: { title: {} },
      noData: {
        text: 'No hay datos disponibles',
        align: 'center',
      },
      theme: {
        mode: 'dark',
      },
    };
  }
}
