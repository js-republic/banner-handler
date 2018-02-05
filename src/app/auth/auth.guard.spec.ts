import { AuthGard } from './auth.guard';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { AuthService } from './auth.service';
import { of } from 'rxjs/observable/of';
import { User } from './user';
import { Router } from '@angular/router';

describe('AuthGard', () => {

  let mockedService: AuthService;
  let mockedRouter: Router;

  beforeEach(() => {
    mockedService = mock(AuthService);
    mockedRouter = mock(Router);
  });

  it('should return pass when user is present', done => {
    // given
    when(mockedService.user).thenReturn(of(new User('1', 'Mathieu', '/avatar.png')));
    const guard = new AuthGard(instance(mockedRouter), instance(mockedService));

    // then
    guard.canActivate(null, null).subscribe(shouldPass => {
      expect(shouldPass).toBe(true);
      done();
    });
  });

  it('should not return pass and forward to login when user is missing', done => {
    // given
    when(mockedService.user).thenReturn(of(null));
    const guard = new AuthGard(instance(mockedRouter), instance(mockedService));

    // then
    guard.canActivate(null, null).subscribe(shouldPass => {
      expect(shouldPass).toBe(false);
      verify(mockedRouter.navigate(anything())).once();
      done();
    });
  });
});
