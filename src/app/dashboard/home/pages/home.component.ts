import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // OPTIONS FOR GRIDSTER
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  constructor() {}

  ngOnInit(): void {
    this.options = {
      itemChangeCallback: (v) => {
        console.log('change', v);
      },
      itemResizeCallback: (v) => {
        console.log('resize', v);
      },
      resizable: {
        enabled: false,
      },
      draggable: {
        delayStart: 0,
        enabled: false,
      },
      pushItems: true,
    };
    this.dashboard = [
      { cols: 3, rows: 1, y: 0, x: 0 },
      { cols: 2, rows: 2, y: 1, x: 0 },
      { cols: 1, rows: 2, y: 1, x: 1 },
    ];
  }
}
