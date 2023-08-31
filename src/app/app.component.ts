import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from './libs/layout/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard-iot';

  @HostBinding('class') className = '';

  isDarkTheme: Observable<boolean>;

  constructor(private themeService: LayoutService) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isDarkTheme.subscribe((value) => {
      if (value) {
        setTimeout(() => {
          this.className = 'dark-mode';
        }, 250);
      } else {
        this.className = '';
      }
    });
  }
}
