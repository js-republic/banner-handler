import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [UserService]
})

export class AppComponent {
  user = {};

  public isLogged = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.listenRouterEvent();
  }

  listenRouterEvent() {
    this.isLogged = false;
    this.router.events.forEach(event => {
      if ( event instanceof NavigationStart ) {
        if ( event.url != '/login' ) {
          this.isLogged = true;
          this.setUser();
        }
      }
    });
  }

  setUser() {
    this.userService.loadUser().subscribe(res => {
      this.user.username = res.name;
      this.user.imgURL = res.avatar;
    });
  }
}
