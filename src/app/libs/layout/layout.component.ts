import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { menu } from './models/menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LayoutService } from './services/layout.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  /**
   * indica si el sidebar esta abierto o cerrado.
   */
  set opened(value: boolean) {
    this._opened = value;
    localStorage.setItem('sideBarOpened', JSON.stringify(this.opened));
  }
  get opened(): boolean {
    return this._opened;
  }
  _opened: boolean;

  menus: menu[] = [
    {
      label: 'Inicio',
      icon: 'home',
      route: 'dashboard/home',
    },
    {
      label: 'Panel de control',
      icon: 'dashboard_customize',
      route: 'dashboard/panel-control',
    },
    {
      label: 'Crear Plantilla',
      icon: 'design_services',
      route: 'dashboard/template',
    },
  ];

  /**
   * controla el menu seleccionado.
   */
  controlMenu: FormControl = new FormControl('Inicio');

  user: any = {
    username: 'admin',
    rol: 'administrador',
  };

  get darkMode(): boolean {
    return this._darkMode;
  }

  set darkMode(value: boolean) {
    this._darkMode = value;
    //aqui va el tema oscuro
    this.layoutService.setDarkTheme(value);
    localStorage.setItem('theme', JSON.stringify(value));
  }
  _darkMode: boolean = false;

  /**
   * previene el cambio de menu cuando se esta en algun menu que lo requiera.
   */
  preventChange: boolean = false;

  @HostBinding('class') className = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //sidebar abierto o cerrado
    let localopenedBar = localStorage.getItem('sideBarOpened');
    if (localopenedBar) {
      this.opened = JSON.parse(localopenedBar);
    }
    //tema del usuario
    let localTheme = localStorage.getItem('theme');
    if (localTheme) {
      this.darkMode = JSON.parse(localTheme);
    }
    this.className = this.darkMode ? 'darkMode' : '';

    this.user = this.authService.user;

    this.layoutService.getPrevent().subscribe((prevent) => {
      console.log('prevent', prevent);
      this.preventChange = prevent;
    });

    this.route.data.subscribe((data) => {
      console.log('DATA OF ROUTE', data);
    });
  }

  changeMenu(itemMenu: menu) {
    console.log('changeMenu', itemMenu)
    this.layoutService.changeNav$.next(itemMenu);
    if (this.preventChange) {
      return;
    }
    this.controlMenu.setValue(itemMenu.label);
    this.router.navigate([itemMenu.route]);
  }

  logout() {
    this.authService.logout();
  }
}
