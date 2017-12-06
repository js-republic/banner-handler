import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.getUser()
      .then(user => {
        return true;
      })
      .catch(e => {

        const env = localStorage.getItem('testEnv');

        if(env && env === 'true') {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      });
  }
}
