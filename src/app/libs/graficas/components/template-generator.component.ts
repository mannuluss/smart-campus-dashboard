import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent, ChartType } from 'ng-apexcharts';
import { ChartOptions, relationTypeGraph } from '../config/apexchart.type';
import { defaultChartConfig } from '../config/default.chart.config';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TemplateService } from '../services/template.service';
import { DialogService } from 'src/app/core/dialog/services/dialog.service';
import { ExampleDataTemplate } from '../models/example-template.dto';
import { Observable, of } from 'rxjs';
import { ExampleArray } from '../examples/examples.data';
import { TemplateDTO } from 'src/app/core/models/template.dto';
import { ModalConfirmService } from 'src/app/core/modal-confirm/services/modal-confirm.service';
import { MatSelectCompleteComponent } from '../../material/mat-select-complete/mat-select-complete.component';

@Component({
  selector: 'app-template',
  templateUrl: './template-generator.component.html',
  styleUrls: ['./template-generator.component.scss'],
})
export class TemplateGeneratorComponent implements OnInit {
  @Input() type: ChartType = 'line';

  @ViewChild('chart') chart: ChartComponent;

  chartOptions: ChartOptions;

  /**
   * lista de tipos de graficas y sus ejemplos
   */
  listTypeGraphics = relationTypeGraph;

  form: FormGroup<any>;

  //----------------------------------DATOS----------------------------------------------
  listTemplates$: Observable<TemplateDTO[]> = of([]);

  /**
   * formulario de la plantilla.
   */
  formPlantilla: FormGroup<{ id: any; name: any; data: any }>;

  plantillaMode: 'create' | 'edit' = 'create';
  /**
   * indica si se esta editando una plantilla
   */
  get isEditMode() {
    return this.plantillaMode == 'edit';
  }

  /**
   * indica si se esta creando una nueva plantilla
   */
  get isCreateMode() {
    return this.plantillaMode == 'create';
  }

  @ViewChild('matSelectComplete')
  matSelectComplete: MatSelectCompleteComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private templateService: TemplateService,
    private modalDialog: DialogService,
    private modalConfirm: ModalConfirmService
  ) {
    this.chartOptions = {
      ...defaultChartConfig.base,
      series: [...ExampleArray],
      colors: ['#77B6EA', '#545454'],
      title: {
        text: '',
        align: 'center',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: '',
        },
      },
      yaxis: {
        title: {
          text: '',
        },
        tooltip: {
          enabled: true,
        },
      },
    };
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'chart.type': [this.type],
      series: [...ExampleArray],
      colors: new FormArray([
        new FormControl('#77B6EA'),
        new FormControl('#545454'),
      ]),
      'title.text': [this.chartOptions.title.text],
      'xaxis.title.text': [''],
      'yaxis.title.text': [''],
      'xaxis.categories': [this.chartOptions.xaxis.categories],
    });

    this.form.controls['chart.type'].valueChanges.subscribe((value) => {
      console.log('change type', value);
      this.chartOptions.chart.type = value;
    });
    this.form.controls['series'].valueChanges.subscribe((value) => {
      console.log('series', value);
      this.chartOptions.series = value;
    });
    this.form.controls['colors'].valueChanges.subscribe((value) => {
      //aqui es el problema
      console.log('change color', value.length);
      this.chartOptions.colors = value;
    });
    this.form.controls['title.text'].valueChanges.subscribe((value) => {
      //this.setProperty('title.text', value);
      this.chartOptions.title.text = value;
    });
    this.form.controls['xaxis.title.text'].valueChanges.subscribe((value) => {
      this.chartOptions.xaxis.title.text = value;
    });
    this.form.controls['yaxis.title.text'].valueChanges.subscribe((value) => {
      this.fixBugYaxis();
      this.chartOptions.yaxis.title.text = value;
    });

    //formulario de la plantilla
    this.formPlantilla = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      data: new FormControl(''),
    });
    this.formPlantilla.controls['id'].valueChanges.subscribe((value) => {
      console.log('change id', value);
      if (value) {
        this.plantillaMode = 'edit';
      } else {
        this.plantillaMode = 'create';
      }
    });
    this.listTemplates$ = this.templateService.getAllTamplates();
  }

  addColorGraph(color: string) {
    if (!this.chartOptions.colors) {
      this.chartOptions.colors = [];
    }
    this.chartOptions.colors.push(color);
  }

  /**
   *
   * @param typeGraphic tipo de grafica
   */
  onChangeTypeGraphic(typeGraphic: ChartType): void {
    console.log('change type', typeGraphic);
    if (typeGraphic) {
      //se busca los datos de ejemplo para el tipo de grafico
      let exampleData = this.listTypeGraphics.find(
        (item) => item.type == typeGraphic
      );
      console.log('example data', exampleData);
      if (exampleData) {
        this.form.controls['series'].setValue(exampleData.example);
      } else {
        console.warn('no se encontro el Ejemplo para el tipo de grafico');
      }
      this.updateGraphic();
    }
  }

  changeExampleData(nameTypeGraph: any) {
    this.form.controls['series'].setValue(
      this.listTypeGraphics.find((item) => item.type == nameTypeGraph).example
    );
  }

  /**
   * actuliza toda la informacion de la grafica.
   */
  updateGraphic() {
    this.chart?.updateOptions(this.chartOptions);
    this.updateSeries();
  }

  /**
   * actualiza la serie de datos del grafico.
   */
  updateSeries() {
    this.chart?.updateSeries(this.chartOptions.series, true);
  }

  typingNameTemplate($event: Event) {
    let currentValue = $event.target['value'];
    if (this.plantillaMode == 'create' && currentValue.length > 0) {
    } else {
      //if (!this.formPlantilla.value['id']) this.isCreateMode = false;
    }
    console.log('typing name template', currentValue);
  }
  /**
   * cambia el valor del nombre de la plantilla.
   * @param value
   */
  searchTemplate(value) {
    //this.formPlantilla.controls['name'].setValue(value);
  }

  /**
   * se selecciona un template entonces se remplaza los datos del formulario
   * @param template
   */
  selectTemplate(template: TemplateDTO) {
    if (!template) {
      this.formPlantilla.reset();
      return;
    }
    this.formPlantilla.patchValue(template);
    //se actualiza las opciones del grafico con el formulario de la plantilla
    this.templateService.formToChartOptions(template.json, this.chartOptions);
    //se cambia la paleta de colores
    this.changeFormArray('colors', this.chartOptions.colors);
    //se cambia el formulario al template
    this.form.patchValue(Object.assign({}, template.json));

    // this.form.setValue(
    //   //this.templateService.chartOptionsToForm(template.data),
    //   template.data,
    //   //this.templateService.formToChartOptions(template.data),
    //   { emitEvent: true }
    // );
    //this.chartOptions = Object.assign({}, template.data);
    //this.chartOptions.colors = Object.assign([], template.data.colors);
    //solucionar el bug que los colores no se actualizan
    //se actuliza el form de las plantillas
    this.updateGraphic();
  }

  editarNameTemplate() {
    //this.formPlantilla.controls['name'].setValue(template.name);
  }

  saveTemplate() {
    console.log(this.formPlantilla.value, this.chartOptions);
    this.formPlantilla.markAllAsTouched();
    if (this.formPlantilla.valid) {
      this.fixBugYaxis();
      let observer = null;
      if (this.formPlantilla.value['id']) {
        //actuliza la plantilla
        observer = this.templateService.updateTemplate(
          this.chartOptions,
          this.formPlantilla.controls['id'].value,
          this.formPlantilla.controls['name'].value
        );
      } else {
        //crea la plantilla
        observer = this.templateService.saveTemplate(
          this.chartOptions,
          this.formPlantilla.controls['name'].value
        );
      }
      observer.subscribe((data) => {
        console.log('data', data);
        this.formPlantilla.controls['id'].setValue(data.id);
        this.matSelectComplete?.updateDataList(data.name);
      });
    }
  }

  deleteTemplate() {
    this.modalConfirm
      .show({
        title: 'Eliminar Plantilla',
        content: '¿Esta seguro que desea eliminar la plantilla?',
        actions: { primary: 'Eliminar', secondary: 'Cancelar' },
      })
      .then((data) => {
        if (data) {
          this.templateService
            .deleteTemplate(this.formPlantilla.value['id'])
            .subscribe((data) => {
              console.log('data', data);
              this.formPlantilla.reset();
              this.matSelectComplete?.limpiar(null);
              this.matSelectComplete?.updateDataList();
            });
        }
      });
  }

  changeFormArray(field: string, array: any[]) {
    let count = (this.form.controls[field] as FormArray).length;
    // let newcolors = new FormArray(
    //   array.map((color, i) => new FormControl(color))
    // );
    // console.log('new colors', newcolors);
    // this.form.setControl(field, newcolors);
    array.forEach((color, i) => {
      if (i >= count) {
        console.log('add color', color);
        (this.form.controls[field] as FormArray).push(new FormControl(color));
      } else {
        (this.form.controls[field] as FormArray).at(i).setValue(color);
      }
    });
  }

  /**
   * este es un bug que ocurre al cambiar el yaxis, y es que se vuelve un array.
   */
  fixBugYaxis() {
    console.warn('Fix sometinhg Bug in the chartOptions.yaxis');
    if (Array.isArray(this.chartOptions.yaxis)) {
      this.chartOptions.yaxis = this.chartOptions.yaxis[0];
    }
  }
}
