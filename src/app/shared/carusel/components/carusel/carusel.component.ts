import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss'],
})
export class CaruselComponent {
  @Input() label: string;

  @Input() formControltoogle: FormControl;

  @Input() items: any[] = [];

  @Input() direction: 'row' | 'column' = 'row';

  @Output() valueChange = new EventEmitter();

  changeValue(value) {
    if (value) {
      this.valueChange.emit(value);
    }
  }
}
