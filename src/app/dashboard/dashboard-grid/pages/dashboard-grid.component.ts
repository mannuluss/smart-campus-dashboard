import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  GridsterComponent,
  GridsterComponentInterface,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridsterItemComponentInterface,
} from 'angular-gridster2';
import { EventGridRemoveItem, EventGridSaveItem } from '../models/events.model';
import { FormControl } from '@angular/forms';
import { DashbaordGridService } from '../services/dashbaord-grid.service';
import { ModalConfirmService } from 'src/app/core/modal-confirm/services/modal-confirm.service';
import { LayoutService } from 'src/app/shared/layout/services/layout.service';
import _ from 'underscore';
import { TemplateDTO } from 'src/app/core/models/template.dto';
import { RelationGristerTemplate } from '../models/data-grid-template';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.scss'],
})
export class DashboardGridComponent implements OnInit {
  // OPTIONS FOR GRIDSTER
  options: GridsterConfig;
  /**
   * lista de gridster items de la grilla.
   */
  dashboard: Array<GridsterItem>;

  /**
   * id del grid almacenado en la base de datos.
   * null es porque el usuario no ha guardado una configuracion para el.
   */
  idGrid: number = null;

  /**
   * las plantillas de graficas que se han aplicado a cada grid.
   */
  templates: RelationGristerTemplate = {};

  /**
   * lista de componentes hijos del gridster (ya renderizada).
   */
  gridItemsComponent: { [index: string]: GridsterItemComponentInterface } = {};

  /**
   * informacion del grid sin cambiar.
   */
  initialDashboard: Array<GridsterItem>;

  /**
   * informacion de los templates sin cambiar.
   */
  initialTemplates: RelationGristerTemplate = {};

  get isChanged(): boolean {
    return (
      !_.isEqual(this.dashboard, this.initialDashboard) ||
      !_.isEqual(this.templates, this.initialTemplates)
    );
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private dashbaordGridService: DashbaordGridService,
    private modalConfirmService: ModalConfirmService,
    private layoutService: LayoutService
  ) {}

  // static itemChange(item, itemComponent) {
  //   console.info('itemChanged', item, itemComponent);
  // }

  // static itemResize(item, itemComponent) {
  //   console.info('itemResized', item, itemComponent);
  // }

  // static eventStart(
  //   item: GridsterItem,
  //   itemComponent: GridsterItemComponentInterface,
  //   event: MouseEvent
  // ) {
  //   console.info('eventStart', item, itemComponent, event);
  // }

  // static eventStop(
  //   item: GridsterItem,
  //   itemComponent: GridsterItemComponentInterface,
  //   event: MouseEvent
  // ) {
  //   console.info('eventStop', item, itemComponent, event);
  // }

  // static overlapEvent(
  //   source: GridsterItem,
  //   target: GridsterItem,
  //   grid: GridsterComponent
  // ) {
  //   console.log('overlap', source, target, grid);
  // }

  ngOnInit() {
    this.options = {
      itemInitCallback: (grid, itemComponent) => {
        // console.log(
        //   'itemInitCallback',
        //   this.dashboard.findIndex((item) => item == itemComponent.item)
        // );
        let indexChild = this.dashboard.findIndex(
          (item) => item == itemComponent.item
        );
        this.gridItemsComponent[indexChild] = itemComponent;
      },
      itemChangeCallback: (grid, itemComponent) => {
        // console.log('change item on PARENT', grid, itemComponent);
      },
      itemResizeCallback: (grid, itemComponent) => {
        //console.log('itemResizeCallback');
        // console.log('itemResizeCallback', itemComponent);
        // let itemIndex = grid.
        // this.gridItemsComponent[itemIndex] = itemComponent;
      },
      itemRemovedCallback: (grid, itemComponent) => {
        console.log('itemRemovedCallback', itemComponent);
        let indexChild = this.dashboard.findIndex(
          (item) => item == itemComponent.item
        );
        delete this.gridItemsComponent[indexChild];
      },
      resizable: {
        enabled: true,
      },
      displayGrid: 'none',
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'parent-grid-item',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        dropOverItems: false,
        // stop: DashboardGridComponent.eventStop,
        // start: DashboardGridComponent.eventStart,
        // dropOverItemsCallback: DashboardGridComponent.overlapEvent,
      },
      pushItems: true,
    };

    this.initGridLayout();
    //se subcribe a los cambios del navbar
    this.layoutService.getChangeNav().subscribe((data) => {
      if (this.isChanged) {
        this.saveGridsterOptions();
      } else {
        this.preventChangeNavbarAndShowSave(false);
      }
    });
  }

  /**
   * cargando el estado inicial o alamacenado del layout del grid.
   */
  initGridLayout() {
    //se crea la grilla por defecto.
    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0 },
      { cols: 2, rows: 2, y: 0, x: 2 },
      { cols: 1, rows: 1, y: 1, x: 1 },
      { cols: 1, rows: 1, y: 1, x: 0 },
    ];
    this.dashbaordGridService
      .getGridsterOptions()
      .subscribe((backendDashbaord) => {
        console.log('backendDashbaord', backendDashbaord);
        if (backendDashbaord) {
          //se carga la grilla ya guarda por el usuario.
          this.idGrid = backendDashbaord.id;
          // this.dashboard = backendDashbaord.json.grid;
          this.dashboard = [];
          backendDashbaord.json.forEach((data, index) => {
            this.dashboard.push(data.grid);
            if (data.formTemplate) this.templates[index] = data.formTemplate;
          });
          //se crea una copia de la informacion inicial (backup).
          this.initialDashboard = _.clone(this.dashboard);
          this.initialTemplates = _.clone(this.templates);
        }
      });
    this.initialDashboard = _.clone(this.dashboard);
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  /**
   * Elimina un grid y el template de su grafica del dashboard.
   * @param $event evento del gridster
   */
  removeItem($event: EventGridRemoveItem) {
    let index = this.dashboard.indexOf($event.item);
    //elimina el template del grid
    delete this.templates[index];
    this.dashboard.splice(index, 1);
  }

  /**
   * agrega un item al grid.
   */
  addGridItem() {
    this.dashboard.push({
      y: 0,
      x: 0,
      cols: 1,
      rows: 1,
    });
    this.preventChangeNavbarAndShowSave(true);
  }

  /**
   * Se guarda la informacion del template en el grid.
   * y se informa al layout para tener en cuenta el modal de confirmacion.
   * @param data informacion del template agregado al grid
   */
  saveTemplate(data: EventGridSaveItem) {
    this.templates[data.index] = data.formTemplate;
    this.preventChangeNavbarAndShowSave(true);
  }

  /**
   * previne el cambio de navbar y muestra el boton de guardar.
   */
  preventChangeNavbarAndShowSave(state: boolean) {
    this.layoutService.setPrevent(state);
  }

  getParentComponent(index: number) {
    try {
      return this.gridItemsComponent[index];
    } catch (error) {
      return null;
    }
  }

  /**
   * guarda la configuracion del grid en el backend.
   */
  saveGridsterOptions() {
    this.layoutService.setPrevent(true);
    this.modalConfirmService
      .show({
        title: 'Cambios sin guardar',
        content: 'Hay cambios sin guardar, ¿Desea guardar los cambios?',
        actions: {
          primary: 'Guardar',
          secondary: 'Cancelar',
        },
      })
      .then((data) => {
        if (data) {
          this.saveOptions();
        }
      });
  }

  /**
   * envia la informacion al back y la guarda.
   */
  saveOptions() {
    console.log('saveOptions', this.dashboard, this.templates);
    this.dashbaordGridService
      .postGridsterOptions(this.idGrid, this.dashboard, this.templates)
      .subscribe((data) => {
        this.idGrid = data.id;
        this.initialDashboard = _.clone(this.dashboard);
        this.initialTemplates = _.clone(this.templates);
        this.preventChangeNavbarAndShowSave(false);
        console.log(data);
      });
  }

  /**
   * descarta los cambios realizados en el grid.
   */
  discardChanges() {
    this.modalConfirmService
      .show({
        title: 'Descartar',
        content: '¿Desea descartar los cambios?',
        actions: {
          primary: 'Descartar',
          secondary: 'Cancelar',
        },
      })
      .then((data) => {
        this.dashboard = _.clone(this.initialDashboard);
        this.templates = _.clone(this.initialTemplates);
        this.preventChangeNavbarAndShowSave(false);
      });
  }
}
