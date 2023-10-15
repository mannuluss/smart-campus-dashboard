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
  ApexNoData,
  ApexTheme,
} from 'ng-apexcharts';
import {
  ExampleSimpleArray,
  generateExampleArray,
  generateExampleRadial,
} from '../examples/examples.data';
import { TypeGraphConfig } from '../models/typeGraphConfig.model';

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
    example: generateExampleArray,
    description:
      'Muestra datos en una línea, permitiéndote ver cómo cambian con el tiempo. Es como seguir una línea que te muestra cómo algo ha crecido o disminuido.',
  },
  {
    name: 'Área',
    type: 'area',
    ico: 'https://cdn-icons-png.flaticon.com/512/6439/6439196.png',
    img: './assets/graph/area-chart.svg',
    example: generateExampleArray,
    description:
      'Una gráfica similar a la de líneas, pero con el área debajo de la línea sombreada, lo que facilita ver la distribución y tendencias de datos.',
  },
  {
    name: 'Barras',
    type: 'bar',
    ico: './assets/icons/bar-chart.png',
    img: './assets/graph/bar-chart.svg',
    example: generateExampleArray,
    description:
      'Una gráfica de barras verticales que representa valores numéricos mediante columnas, ideal para comparar cantidades entre categorías.',
  },
  {
    name: 'Pastel',
    type: 'pie',
    ico: 'https://cdn-icons-png.flaticon.com/512/3687/3687086.png',
    img: './assets/graph/circular-chart.svg',
    example: ExampleSimpleArray,
    description:
      'Una gráfica circular que muestra la proporción de cada valor en un conjunto de datos, útil para resaltar partes de un todo.',
  },
  {
    name: 'Dona',
    type: 'donut',
    ico: 'https://cdn-icons-png.flaticon.com/512/5446/5446224.png',
    img: './assets/graph/donut-chart.svg',
    example: ExampleSimpleArray,
    description:
      'Similar al gráfico de pastel, pero con un agujero en el centro.',
  },
  {
    name: 'Barra Radial',
    type: 'radialBar',
    ico: 'https://cdn-icons-png.flaticon.com/512/7849/7849266.png',
    img: './assets/graph/radial-chart.svg',
    example: generateExampleRadial(),
    description:
      'Muestra el porcentaje de un valor en relación al 100%, util para valores que van de 0 a 100.',
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
