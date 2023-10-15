import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@Component({
  selector: 'app-mat-select-complete',
  templateUrl: './mat-select-complete.component.html',
  styleUrls: ['./mat-select-complete.component.scss'],
  providers: [SearchFilterPipe],
})
export class MatSelectCompleteComponent implements OnInit, OnDestroy {
  @Input('list')
  list$: Observable<any[]> | any[];

  /**
   * key de donde se obtiene el valor a mostrar en el select.
   */
  @Input()
  key: string = 'name';

  /**
   * value que se le asignara al formControl.
   */
  @Input()
  keyValue: string;

  /**
   * nombre del input
   */
  @Input()
  label: string;

  @Input()
  placeholder: string;

  /**
   * formcontrol donde se guarda el valor seleccionado.
   * dependiento de keyValue.
   */
  @Input()
  control: FormControl;

  @Input()
  required: boolean = false;

  /**
   * indica si al buscar en el input se debe recargar la lista.
   */
  @Input()
  reloadOnTyping: boolean = false;

  @Input()
  set disabled(value: boolean) {
    if (value) {
      this.controlText.disable();
    } else {
      this.controlText.enable();
    }
  }

  @Input()
  set value(value: any) {
    // if (value && value[this.key]) {
    //   this.datos.push(value);
    //   this.selectedOption = value;
    //   this.controlText.setValue(Object.assign(value[this.key]));
    // }
  }

  @Input()
  clearButton: boolean = false;

  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  /**
   * emite el valor del input.
   */
  @Output() busquedaChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * control para el text del input.
   */
  controlText: FormControl = new FormControl('');

  selectedOption: any = null;

  searching: boolean = false;

  constructor(
    private pipeFilter: SearchFilterPipe,
    private cdr: ChangeDetectorRef
  ) {}

  subscritionList: Subscription;
  datos: any[] = [];

  typingTimer: any;
  doneTypingInterval: number = 350; // Tiempo en milisegundos para considerar que el usuario ha terminado de escribir

  ngOnInit() {
    this.updateDataList();
    this.controlText.valueChanges.subscribe((value) => {
      this.busquedaChange.emit(value);
    });
  }

  /**
   * se ejecuta cada vez que se escribe en el input.
   */
  handleInput() {
    // let dato = this.datos.find((x) => x[this.key] == this.controlText.value);
    // if (dato) {
    //   this.selectedOption = dato;
    //   this.selectedChange.emit(dato);
    // } else {
    //   //this.selectedOption = null;
    // }

    if (this.reloadOnTyping) {
      clearTimeout(this.typingTimer); // Limpiar el temporizador previo
      this.typingTimer = setTimeout(
        () => this.updateDataList(),
        this.doneTypingInterval
      );
    }
  }

  handleBlur() {
    if (this.required) {
      setTimeout(() => {
        if (this.selectedOption) {
          this.controlText.setErrors(null);
        } else {
          this.controlText.setErrors({ required: true });
        }
      }, 100);
    }
    if (
      this.selectedOption &&
      this.controlText.value !== this.selectedOption[this.key]
    ) {
      this.controlText.setValue(this.selectedOption[this.key]);
    }
  }

  handleFocus() {
    this.focus.emit();
  }

  /**
   * actualiza la lista de datos.
   * en caso de que sea un observable se suscribe a el.
   */
  updateDataList(newValueText?: any) {
    this.subscritionList?.unsubscribe();
    if (this.list$ instanceof Observable) {
      this.searching = true;
      this.subscritionList = this.list$.subscribe(
        (data) => {
          this.datos = data;
          this.subscritionList?.unsubscribe();
          this.searching = false;

          let current = this.datos.find((x) => x[this.keyValue] == newValueText);
          if (current) {
            this.controlText.setValue(current[this.key], { emitEvent: false });
            this.selectedOption = current;
            this.selectedChange?.emit(current);
          }
        },
        (error) => {
          this.searching = false;
        }
      );
    } else {
      this.datos = this.list$;
    }
  }

  selecItem(option: any) {
    this.selectedOption = option;
    //se selecciono un item segun al input
    if (option[this.key] != this.controlText.value) {
      this.controlText.setValue(option[this.key]);
      this.controlText.setErrors(null);
    }
    if (this.keyValue) {
      this.control.setValue(option[this.keyValue]);
    }
    this.selectedChange?.emit(option);
  }

  /**
   * lista filtrada por el input.
   */
  filterList(value: string) {
    return this.pipeFilter.transform(this.datos, value, this.key);
  }

  limpiar(event: Event) {
    event?.stopImmediatePropagation();
    this.controlText.setValue('');
    this.selectedOption = null;
    this.control.setValue(null);
    this.selectedChange?.emit(null);
  }

  ngOnDestroy(): void {
    this.subscritionList?.unsubscribe();
  }
}
