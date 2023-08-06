import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { menu } from './models/menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  /**
   * indica si el sidebar esta abierto o cerrado.
   */
  opened: boolean;

  menus: menu[] = [
    {
      label: 'Template',
      icon: 'dashboard',
      route: 'dashboard/template',
    },
  ];

  user: any = {
    username: 'admin',
    rol: 'administrador',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeMenu(itemMenu) {
    this.router.navigate([itemMenu.route]);
  }
}
