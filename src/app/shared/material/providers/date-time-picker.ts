import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';

export const APP_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
// If using Moment
export const CUSTOM_NGX_DATE_TIME_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD HH:mm:ss',
  },
  display: {
    dateInput: 'YYYY-MM-DD HH:mm:ss',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
