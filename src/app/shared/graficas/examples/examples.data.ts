import { ApexAxisChartSeries } from 'ng-apexcharts';
import { faker } from '@faker-js/faker';

export const ExampleArray: ApexAxisChartSeries = [
  {
    name: 'first data',
    data: [28, 29, 33, 36, 32, 32, 33],
  },
];
export const generateExampleArray = () => {
  let data = [];
  let max = faker.number.int({ min: 5, max: 10 });
  for (let index = 0; index < max; index++) {
    data.push(faker.number.int({ min: -5, max: 20 }));
  }
  return [
    {
      name: faker.word.sample({
        strategy: 'shortest',
      }),
      data: data,
    },
  ];
};

export const generateExampleRadial = () => {
  return [faker.number.int({ min: 15, max: 100 })];
};

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

/**
 * data de ejemplo para graficas de tipo array con nombres.
 * @returns
 */
export const GenerateExampleArrayData = () => {
  let example = [];
  for (let index = 0; index < 3; index++) {
    let data = [];
    for (let index = 0; index < 7; index++) {
      data.push(faker.number.int({ min: -5, max: 20 }));
    }
    example.push({
      name: faker.word.sample({
        strategy: 'shortest',
      }),
      data: data,
    });
  }
  return example;
};

export const GenerateExampleSimpleArray = () => {
  let example = [];
  for (let index = 0; index < 7; index++) {
    example.push(faker.number.int({ min: -5, max: 20 }));
  }
  return example;
};
