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
};

/**
 * estructura que relaciona el nombre de la grafica con el tipo de grafica.
 */
export const relationTypeGraph: TypeGraphConfig[] = [
  {
    name: 'Lineal',
    type: 'line',
    img: 'https://cdn-icons-png.flaticon.com/512/9798/9798933.png',
    example: ExampleArray,
  },
  {
    name: 'Área',
    type: 'area',
    img: 'https://cdn-icons-png.flaticon.com/512/6439/6439196.png',
    example: ExampleArray,
  },
  {
    name: 'Barras',
    type: 'bar',
    img: '/assets/graph/bar-chart.png',
    example: ExampleArray,
  },
  {
    name: 'Circular',
    type: 'pie',
    img: 'https://cdn-icons-png.flaticon.com/512/3687/3687086.png',
    example: ExampleSimpleArray,
  },
  {
    name: 'Dona',
    type: 'donut',
    img: 'https://cdn-icons-png.flaticon.com/512/5446/5446224.png',
    example: ExampleSimpleArray,
  },
  {
    name: 'Barra Radial',
    type: 'radialBar',
    img: 'https://cdn-icons-png.flaticon.com/512/7849/7849266.png',
    example: [faker.number.int({ min: 0, max: 100 })],
  },
  // {
  //   name: 'Dispersión',
  //   type: 'scatter',
  //   img: 'https://cdn-icons-png.flaticon.com/512/2364/2364639.png',
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
