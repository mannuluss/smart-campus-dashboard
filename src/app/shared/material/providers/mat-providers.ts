import { NgModule } from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

/**
 * configuracion por defecto de material.
 */
export const MaterialProviders: NgModule['providers'] = [
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance,
  },
];
