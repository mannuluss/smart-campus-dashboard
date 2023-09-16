import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { menu } from './models/menu.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LayoutService } from './services/layout.service';
import { FormControl } from '@angular/forms';
import { BrokerService } from 'src/app/core/services/broker.service';
import { filter } from 'rxjs';

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
      key: 'home',
      label: 'Inicio',
      icon: 'home',
      route: 'dashboard/home',
    },
    {
      key: 'panel-control',
      label: 'Panel de control',
      icon: 'dashboard_customize',
      route: 'dashboard/panel-control',
    },
    {
      key: 'template',
      label: 'Crear Plantilla',
      icon: 'design_services',
      route: 'dashboard/template',
    },
  ];

  /**
   * controla el menu seleccionado.
   */
  controlMenu: FormControl = new FormControl('home');

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

  subscriberRoute: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService,
    private brokerService: BrokerService,
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

    //selecciona el menu que fue seleccionado por la url
    this.initialUrlChange();

    // INICIA EL SERVICIO DEL BROKER
    this.brokerService.connect();
  }

  initialUrlChange() {
    const currentUrl = this.router.url;
    let menu = this.menus.find((m) => '/' + m.route == currentUrl);
    this.changeMenu(menu);
  }

  changeMenu(itemMenu: menu) {
    console.log('changeMenu', itemMenu);
    this.layoutService.changeNav$.next(itemMenu);
    if (this.preventChange) {
      return;
    }
    this.controlMenu.setValue(itemMenu.key);
    this.router.navigate([itemMenu.route]);
  }

  logout() {
    this.authService.logout();
  }
}
