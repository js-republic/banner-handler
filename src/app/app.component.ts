import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  user: any = {};
  isLogged = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.listenRouterEvent();
  }

  listenRouterEvent() {
    this.isLogged = false;
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/login') {
          this.isLogged = true;
          this.setUser();
        }
      }
    });
  }

  setUser() {
    this.authService.getUser()
      .then(res => {
        this.user.username = res.name;
        this.user.imgURL = res.avatar;
      });
  }
}
