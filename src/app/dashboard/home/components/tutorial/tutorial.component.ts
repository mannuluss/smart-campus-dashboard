import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { relationTypeGraph } from '@shared/graficas/config/apexchart.type';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class TutorialComponent {
  graphList = relationTypeGraph;

  constructor(private router: Router) {}

  finalizar(){
    this.router.navigate(['/dashboard/home']);
  }
}
