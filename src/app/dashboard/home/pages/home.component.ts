import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((profile) => {
      this.authenticated = profile ? true : false;
    });
  }

  login() {
    this.authService.login();
  }
}
