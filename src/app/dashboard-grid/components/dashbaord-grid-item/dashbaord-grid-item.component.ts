import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  EventGridRemoveItem,
  EventGridSaveItem,
} from '../../models/events.model';
import {
  GridsterItem,
  GridsterItemComponent,
  GridsterItemComponentInterface,
} from 'angular-gridster2';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { DialogService } from 'src/app/core/dialog/services/dialog.service';
import { ModalGridTemplateComponent } from '../modal-grid-template/modal-grid-template.component';
import { ChartOptions } from 'src/app/libs/graficas/config/apexchart.type';
import { ChartComponent } from 'ng-apexcharts';
import { TemplateService } from 'src/app/libs/graficas/services/template.service';
import _ from 'underscore';
import { FormGridTemplate } from '../../models/form-grid-template';

@Component({
  selector: 'app-dashbaord-grid-item',
  templateUrl: './dashbaord-grid-item.component.html',
  styleUrls: ['./dashbaord-grid-item.component.scss'],
})
export class DashbaordGridItemComponent implements OnInit {
  @Input() item: GridsterItem;

  @Input() index: number;

  @Input()
  set gridsterItem(value: GridsterItemComponentInterface) {
    if (value) {
      this._gridsterItem = value;
      this.heightParent = value?.height;
      this.updateHeightForChart();
      value.itemChanged = () => {
        // console.log('itemChanged', this._gridsterItem?.height, this.item);
        this.heightParent = this._gridsterItem?.height;
        this.updateHeightForChart();
      };
    }
  }

  _gridsterItem: GridsterItemComponentInterface;

  /**
   * id de la plantilla que se esta usando en el grid.
   * esta se consula en la base de datos.
   */
  @Input()
  set formTemplate(value: FormGridTemplate) {
    this._formTemplate = value;
    if (value) {
      this.loadTemplate(value, false);
    }
  }

  get formTemplate() {
    return this._formTemplate;
  }

  _formTemplate: FormGridTemplate;

  @Output() remove: EventEmitter<EventGridRemoveItem> = new EventEmitter();

  @Output() save: EventEmitter<EventGridSaveItem> = new EventEmitter();

  @ViewChild('chart') chart: ChartComponent;

  chartOptions: ChartOptions = null;

  get isChart(): boolean {
    return this.chartOptions != null;
  }

  /**
   * altura del elemento padre (grister-item)
   */
  heightParent: number = 0;

  get heightChild() {
    return String(this.heightParent - 32) + 'px';
  }

  offsetY: number = 32;

  //========================================== ANIMATIONS =====================================================

  /**
   * determina si el elemento esta en el proceso de eliminacion. (animacion de eliminacion)
   */
  isRemoving: boolean = false;

  isLoading: boolean = false;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private modalService: DialogService,
    private templateService: TemplateService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target);
    this.updateHeightForChart();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  updateHeightForChart() {
    if (this.chartOptions) {
      this.chartOptions.chart.height = this.heightChild;
      if (this.chart) this.chart?.updateOptions(this.chartOptions);
    }
  }

  removeItem($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isRemoving = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      let event: EventGridRemoveItem = {
        event$: $event,
        item: this.item,
        i: this.index,
      };
      this.remove.emit(event);
    }, 250);
  }

  modalDataTemplate(edit: boolean) {
    this.modalService
      .show({
        title: edit ? 'Editar Plantilla' : 'Agregar Plantilla',
        component: ModalGridTemplateComponent,
        dataComponent: { editmode: edit, form: this.formTemplate },
        maxWidth: '800px',
      })
      .subscribe((data) => {
        console.log(data.data);
        if (data.estado) {
          this.save.emit({
            index: this.index,
            formTemplate: _.clone(data.data),
          });
          this.modalService.close();
        }
      });
  }

  /**
   * carga la plantilla de la grafica con la data.
   * @param form fomulario de la plantilla y la configuracion de la grafica.
   * @param emitSaveEvent si emite el evento de guardar.
   */
  loadTemplate(form: FormGridTemplate, emitSaveEvent: boolean) {
    this.isLoading = true;
    this.templateService
      .getTemplateById(form.idTemplate)
      .subscribe((template) => {
        this.chartOptions = this.templateService.formToChartOptions(
          template.json
        );

        this.chartOptions.chart.height = this.heightChild;
        if (emitSaveEvent) {
          this.save.emit({
            index: this.index,
            formTemplate: _.clone(form),
          });
        }
        this.isLoading = false;
      });
  }

  /**
   * busca la informacion en el servidor para la grafica.
   */
  searchDataForGraph(){

  }
}
