import { faker } from "@faker-js/faker";
import * as moment from "moment";

export interface categoriesOption {
  name: string;
  icon: string;
  data: any;
}

export const categories: categoriesOption[] = [
  {
    name: 'meses',
    icon: 'calendar_today',
    data: () => {
      return moment.months();
    },
  },
];
