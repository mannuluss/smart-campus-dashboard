import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
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

  /**
   * indica si al buscar en el input se debe recargar la lista.
   */
  @Input()
  reloadOnTyping: boolean = false;

  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

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
  doneTypingInterval: number = 250; // Tiempo en milisegundos para considerar que el usuario ha terminado de escribir

  ngOnInit() {
    this.doneTyping();
    this.controlText.valueChanges.subscribe((value) => {
      this.busquedaChange.emit(value);
    });
  }

  handleInput() {
    let dato = this.datos.find((x) => x[this.key] == this.controlText.value);
    if (dato) {
      this.selectedOption = dato;
      this.selectedChange.emit(dato);
    } else {
      this.selectedOption = null;
    }

    if (this.reloadOnTyping) {
      clearTimeout(this.typingTimer); // Limpiar el temporizador previo
      this.typingTimer = setTimeout(
        () => this.doneTyping(),
        this.doneTypingInterval
      );
    }
  }

  handleBlur() {
    setTimeout(() => {
      if (this.selectedOption) {
        this.controlText.setErrors(null);
      } else {
        this.controlText.setErrors({ required: true });
      }
    }, 100);
  }

  handleFocus() {
    this.focus.emit();
  }

  // acción que necesites después de que el usuario ha dejado de escribir
  doneTyping() {
    if (this.list$ instanceof Observable) {
      this.searching = true;
      this.subscritionList = this.list$.subscribe(
        (data) => {
          this.datos = data;
          this.subscritionList?.unsubscribe();
          this.searching = false;
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
    console.log('select');
    this.selectedOption = option;
    //se selecciono un item que no se habia escrito todo en el input.
    if (option[this.key] != this.controlText.value) {
      this.controlText.setValue(option[this.key]);
      this.controlText.setErrors(null);
    }
    if (this.keyValue) {
      this.control.setValue(option[this.keyValue]);
    }
    this.selectedChange.emit(option);
  }

  /**
   * lista filtrada por el input.
   */
  filterList(value: string) {
    return this.pipeFilter.transform(this.datos, value, this.key);
  }

  ngOnDestroy(): void {
    this.subscritionList?.unsubscribe();
  }
}
