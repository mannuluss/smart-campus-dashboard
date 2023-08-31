import { ApexAxisChartSeries } from 'ng-apexcharts';
import { ExampleDataTemplate } from '../models/example-template.dto';

export const ExampleArray: ApexAxisChartSeries = [
  {
    name: 'example data for lines',
    data: [28, 29, 33, 36, 32, 32, 33],
  },
];

export const Areas: ApexAxisChartSeries = [
  {
    name: 'example data for areas',
    data: [28, 29, 33, 36, 32, 32, 33],
  },
];

export const ExampleSimpleArray = [5, 35, 40, 10, 4];

export const ExampleGroupMultidata: ApexAxisChartSeries = [
  {
    name: 'SAMPLE A',
    data: [
      [16.4, 5.4],
      [27.1, 2.3],
      [16.4, 0],
      [13.6, 3.7],
      [22.1, 2],
    ],
  },
  {
    name: 'SAMPLE B',
    data: [
      [36.4, 13.4],
      [3.6, 12.2],
      [1.9, 13.2],
      [2.9, 11.5],
      [7.1, 10.8],
      [2.1, 12],
    ],
  },
  {
    name: 'SAMPLE C',
    data: [
      [19, 5],
      [22.4, 3],
      [16.4, 0],
    ],
  },
];

