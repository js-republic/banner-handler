import { AuthGard } from './auth.guard';
import { instance, mock, when } from 'ts-mockito';

import { AuthService } from './auth.service';
import { of } from 'rxjs/observable/of';
import { User } from './user';

describe('AuthGard', () => {

  let guard: AuthGard;
  let service: AuthService;
  let serviceClass: AuthService;

  beforeEach(() => {
    serviceClass = mock(AuthService);
  });

  it('should return pass when user is returned by server', (done) => {
    // given
    when(serviceClass.user).thenReturn(of(new User('1', 'Mathieu', '/avatar.png')));
    service = instance(serviceClass);
    guard = new AuthGard(null, service);

    // then
    guard.canActivate(null, null).subscribe(shouldPass => {
      expect(shouldPass).toBe(true);
      done();
    });
  });
});
