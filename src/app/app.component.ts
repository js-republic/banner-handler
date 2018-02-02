import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.listenRouterEvent();
  }

  listenRouterEvent() {
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart && event.url !== '/login') {
        this.authService.user.subscribe(user => this.user = user);
      }
    });
  }
}
