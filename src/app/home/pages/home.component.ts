import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
      {
        data: [80, 88, 30, 25, 50],
        label: 'dato 2',
        fill: true,
        borderColor: 'rgb(255,0,255)',
        backgroundColor: '#454545',
        hoverBackgroundColor: '#252525',
      },
    ],
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
}
