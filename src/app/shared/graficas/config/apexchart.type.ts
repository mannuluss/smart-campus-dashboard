import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTooltip,
  ApexOptions,
  ApexNoData,
  ApexTheme,
} from 'ng-apexcharts';
import {
  ExampleArray,
  ExampleGroupMultidata,
  ExampleSimpleArray,
} from '../examples/examples.data';
import { TypeGraphConfig } from '../models/typeGraphConfig.model';
import { faker } from '@faker-js/faker';

/**
 * estructura que contiene las opciones de configuracion de la grafica.
 */
export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  dataLabels?: ApexDataLabels;
  markers?: ApexMarkers;
  colors?: string[];
  title?: ApexTitleSubtitle;
  legend?: ApexLegend;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  tooltip?: ApexTooltip;
  labels?: string[];
  noData?: ApexNoData;
  theme?: ApexTheme;
};

/**
 * estructura que relaciona el nombre de la grafica con el tipo de grafica.
 */
export const relationTypeGraph: TypeGraphConfig[] = [
  {
    name: 'Lineal',
    type: 'line',
    ico: 'https://cdn-icons-png.flaticon.com/512/9798/9798933.png',
    img: './assets/graph/line-chart.svg',
    example: ExampleArray,
    description: 'Una grafica de puntos y lineas donde se muestra el valor de cada punto.'
  },
  {
    name: 'Área',
    type: 'area',
    ico: 'https://cdn-icons-png.flaticon.com/512/6439/6439196.png',
    img: './assets/graph/area-chart.svg',
    example: ExampleArray,
    description:
      'Una grafica de puntos y lineas donde se muestra un area sombreada debajo de la linea de un color degradado.',
  },
  {
    name: 'Barras',
    type: 'bar',
    ico: './assets/icons/bar-chart.png',
    img: './assets/graph/bar-chart.svg',
    example: ExampleArray,
    description:
      'Una grafica de barras donde el valor se muestra como una barra vertical. se periten multiples series de datos.',
  },
  {
    name: 'Circular',
    type: 'pie',
    ico: 'https://cdn-icons-png.flaticon.com/512/3687/3687086.png',
    img: './assets/graph/circular-chart.svg',
    example: ExampleSimpleArray,
    description: '',
  },
  {
    name: 'Dona',
    type: 'donut',
    ico: 'https://cdn-icons-png.flaticon.com/512/5446/5446224.png',
    img: './assets/graph/donut-chart.svg',
    example: ExampleSimpleArray,
    description: '',
  },
  {
    name: 'Barra Radial',
    type: 'radialBar',
    ico: 'https://cdn-icons-png.flaticon.com/512/7849/7849266.png',
    img: './assets/graph/radial-chart.svg',
    example: [faker.number.int({ min: 0, max: 100 })],
    description: 'Muestra el porcentaje de un valor en relación al 100%',
  },
  // {
  //   name: 'Dispersión',
  //   type: 'scatter',
  //   ico: 'https://cdn-icons-png.flaticon.com/512/2364/2364639.png',
  //   example: ExampleGroupMultidata
  // },
  // { name: 'Burbujas', type: 'bubble' },
  // { name: 'Mapa de Calor', type: 'heatmap' },
  // { name: 'Vela', type: 'candlestick' },
  // { name: 'Diagrama de Caja', type: 'boxPlot' },
  // { name: 'Radar', type: 'radar' },
  // { name: 'Área Polar', type: 'polarArea' },
  // { name: 'Barra de Rango', type: 'rangeBar' },
  // { name: 'Área de Rango', type: 'rangeArea' },
  // { name: 'Mapa de Árbol', type: 'treemap' },
];
